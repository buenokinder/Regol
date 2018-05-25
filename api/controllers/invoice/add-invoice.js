
module.exports = {


    friendlyName: 'Add Product',
  
  
    description: 'Add one or more Products.',
  
  
    inputs: {
  
      invoice: {
        type: 'ref',
        description: 'The current incoming request (req).',
        required: false
      },
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
     
     
      var invoice = inputs.invoice;
        
      function compareDate(str1){
       
        var dt1   = parseInt(str1.substring(0,2));
        var mon1  = parseInt(str1.substring(3,5));
        var yr1   = parseInt(str1.substring(6,10));
        var date1 = new Date(yr1, mon1-1, dt1);
        return date1;
        }

        var existingInvoice = await Invoice.findOne({ numero: invoice.numero });
        var newInvoice = {};
        newInvoice["numero"] = invoice.numero;
        newInvoice.company =   invoice.company.id ;
        newInvoice.customer =  invoice.customer.id ;
        newInvoice.date = compareDate(invoice.date) ;
        newInvoice.total = invoice.total;
        newInvoice.fiscalDate = compareDate(invoice.fiscalDate) ;
        
        newInvoice.discount = invoice.discount;
        console.log('Teste');
        if(!existingInvoice) {

          var invoiceRetorno = await Invoice.create(newInvoice).fetch();
          console.log(invoiceRetorno);
          for (let invoiceItem of invoice.invoiceItems) {
            
            var newInvoiceItem= {};
            
            newInvoiceItem.invoice = invoiceRetorno.id;
            newInvoiceItem.quantity = invoiceItem.quantity;
            newInvoiceItem.costPrice = invoiceItem.costPrice;
            newInvoiceItem.salePrice = invoiceItem.salePrice;
            newInvoiceItem.product = invoiceItem.product.id;


              await InvoiceItems.create(newInvoiceItem).fetch();
            
          }//∞
        }
      
  
      return exits.success();
  
    }
};
  