
module.exports = {


    friendlyName: 'Update Invoice',
  
  
    description: 'Update one  Invoice.',
  
  
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
      var product = inputs.product;


      function compareDate(str1){
       
        var dt1   = parseInt(str1.substring(0,2));
        var mon1  = parseInt(str1.substring(3,5));
        var yr1   = parseInt(str1.substring(6,10));
        var date1 = new Date(yr1, mon1-1, dt1);
        return date1;
        }

      var invoice = inputs.invoice;

      var newInvoice = {};
        newInvoice["numero"] = invoice.numero;
        newInvoice.company =   invoice.company.id ;
        newInvoice.customer =  invoice.customer.id ;
        newInvoice.date = compareDate(invoice.date);
        newInvoice.total = invoice.total;
        newInvoice.fiscalDate = compareDate(invoice.fiscalDate);
        newInvoice.discount = invoice.discount;
        console.log('1')
        
        var existingInvoice = await Invoice.findOne({ numero: invoice.numero });
        console.log('2')
        if(existingInvoice) {
            console.log('3')
            var retorno = await Invoice.update(existingInvoice).set(newInvoice).fetch();
        }
        
        await InvoiceItems.destroy({ invoice: existingInvoice.id }).fetch();
        console.log('4')

          for (let invoiceItem of invoice.invoiceItems) {
            console.log('5')
            var newInvoiceItem= {};
            
            newInvoiceItem.invoice = invoice.id;
            newInvoiceItem.quantity = invoiceItem.quantity;
            newInvoiceItem.costPrice = invoiceItem.costPrice;
            newInvoiceItem.salePrice = invoiceItem.salePrice;
            newInvoiceItem.product = invoiceItem.product.id;
            console.log('6')

              await InvoiceItems.create(newInvoiceItem).fetch();
              console.log('7')
          }
      
  
      return exits.success();
  
    }
};
  