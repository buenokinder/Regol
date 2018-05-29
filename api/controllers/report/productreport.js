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

  var items = [];
  const result = await  rawMongoCollection.aggregate([
       {$match: {}}
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
    return exits.success({
      currentSection: 'welcome',
      invoiceItems: result,
    });

  }


};

