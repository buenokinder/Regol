module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/invoice/list',
        description: 'Display the Products List.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {

      var month = this.req.param('month');
      var db =  Customer.getDatastore().manager;
   
  
      var date = new Date(), y = date.getFullYear(), m = 5
      if(!month) month = date.getMonth();
      var m = new Number(month) + 1;
      var firstDay = new Date(y, month, 1);
      var firstDay1 = new Date(y, m, 1);
      var lastDay = new Date(2018, month + 1, 0);

      
      var invoices = await Invoice.find().where({ fiscalDate: { '>': firstDay, '<':  firstDay1 }}).populate('customer')
                                          .populate('company')
                                          .populate('invoiceItems').sort('numero Desc');;

      for (let invoice of invoices) {
        for (let invoiceItem of invoice.invoiceItems) {
          invoiceItem.product = await Product.findOne({ id: invoiceItem.product});
       
        }       
       
      }                                    
      var products = await Product.find();
      var customers = await Customer.find();
      var companies = await Company.find();
      return exits.success({
        currentSection: 'invoice',
        invoices: invoices,
        products: products,
        customers: customers,
        companies:companies,
      });
  
    }
  
  
  };
  
  