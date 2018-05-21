
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
        
        var existingInvoice = await Invoice.findOne({ numero: invoice.numero });
        var newInvoice = {};
        newInvoice["numero"] = invoice.numero;
        newInvoice.company =   invoice.company.id ;
        newInvoice.customer =  invoice.customer.id ;
        newInvoice.date = invoice.date;
        newInvoice.total = invoice.total;
        newInvoice.discount = invoice.discount;

        if(!existingInvoice) {
          sails.log(newInvoice);
          await Invoice.create(newInvoice).fetch();

          for (let invoiceItem of invoice.invoiceItems) {
            sails.log(invoiceItem)
            var newInvoiceItem= {};
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
  