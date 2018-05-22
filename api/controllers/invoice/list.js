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
      var invoices = await Invoice.find().populate('customer')
                                          .populate('company')
                                          .populate('invoiceItems');
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
  
  