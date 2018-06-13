module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/report/productreport',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
       
  var db = InvoiceItems.getDatastore().manager;
  console.log(InvoiceItems.tableName)
  var rawMongoCollection = db.collection("invoiceitems");
  var month = this.req.param('month');
  var db =  Customer.getDatastore().manager;


  var date = new Date(), y = date.getFullYear(), m = 5
  if(!month) month = date.getMonth();
  var m = new Number(month) + 1;
  var firstDay = new Date(y, month, 1);
  var firstDay1 = new Date(y, m, 1);
  var lastDay = new Date(2018, month + 1, 0);

    
  var invoices = await Invoice.find().where({ fiscalDate: { '>': firstDay, '<':  firstDay1 }});
  var items = [];
  console.log(invoices)
  const result = await  rawMongoCollection.aggregate([
       {$match: { invoice: { $in: [{'5b1aaeea906e9b5eea4f7596'}] } }}
    ,
     { $lookup: {
      from: "product",
      localField: "product",
      foreignField: "_id",
      as: "product"
   }},
     { $group : { _id : { product: "$product"  , salePrice: "$salePrice"  } ,
     totalPrice: { $sum: { $multiply: [ "$salePrice", "$quantity" ] } },
     totalCost: { $sum: { $multiply: [ "$costPrice", "$quantity" ] } },
     quantity: { $sum:  "$quantity" } } }, 
    
   ]).toArray();
   console.log(result)
   var invoices =   await Invoice.find();

   var totalDiscount = 0;
   for (let invoice of invoices) {
     totalDiscount = totalDiscount + invoice.discount; 
   }
   var custoTotal = 0;
    for (let item of result) {
      custoTotal = custoTotal + item.totalCost;
    }

    for (let item of result) {

      var contribuicaoCusto = ((item.totalCost*100)/custoTotal)/100;
 

      item.totalCost = item.totalCost+(item.totalCost*contribuicaoCusto);
     
    }


    return exits.success({
      currentSection: 'welcome',
      invoiceItems: result,
    });

  }


};

