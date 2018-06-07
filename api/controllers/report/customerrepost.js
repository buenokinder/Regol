module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/report/customerreport',
        description: 'Display the welcome page for authenticated users.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
         
    var db = InvoiceItems.getDatastore().manager;
    console.log(InvoiceItems.tableName)
    var rawMongoCollection = db.collection("invoice");
  
    var items = [];
    const result = await  rawMongoCollection.aggregate([
         {$match: {}}
       ,
       { $lookup: {
        from: "customer",
        localField: "customer",
        foreignField: "_id",
        as: "customer"
     }},{ $lookup: {
        from: "invoiceitems",
        localField: "invoiceitems",
        foreignField: "_id",
        as: "invoiceitems"
     }},
       { $group : { _id : { customer: "$customer"   } ,
       totalDicount: { $sum: "$discount" } ,
       total: { $sum: "$total" } } }, 
      
     ]).toArray();

  console.log(result);
  
      return exits.success({
        currentSection: 'welcome',
        invoices: result,
      });
  
    }
  
  
  };
  
  