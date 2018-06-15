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

    
  var invoices = await Invoice.find().where({ fiscalDate: { '>': firstDay, '<':  firstDay1 }}).populate('invoiceItems');
  
   var options = {
        
  };
  
  var pipeline = [
      {
          "$project": {
              "_id": 0,
              "invoiceitems": "$$ROOT"
          }
      }, 
      {
          "$lookup": {
              "localField": "invoiceitems.invoice.id",
              "from": "invoice",
              "foreignField": "id",
              "as": "invoice"
          }
      }, 
      
      {
          "$unwind": {
              "path": "$invoice",
              "preserveNullAndEmptyArrays": false
          }
      }, 
      {
          "$match": {
              "invoice.fiscalDate": {
                  "$gt": firstDay
              }
          }
      }, 
      {
        
          "$group": {
              "_id": {
                  "invoiceitems\u1390product": "$invoiceitems.product",
                  "invoiceitems\u1390salePrice": "$invoiceitems.salePrice" },
                      "totalPrice": { "$sum": { "$multiply": [ "$invoiceitems.salePrice", "$invoiceitems.quantity" ] } },
                      "totalCost": { "$sum": { "$multiply": [ "$invoiceitems.costPrice", "$invoiceitems.quantity" ] } },
                      "quantity": { "$sum":  "$invoiceitems.quantity" }  
              
          }
      }, 
      {
          "$project": {
              "_id": 0,
              "invoiceitems.product": "$_id.invoiceitems\u1390product",
              "invoiceitems.salePrice": "$_id.invoiceitems\u1390salePrice",
              "totalPrice": "$totalPrice",
              "totalCost": "$totalCost",
              "quantity": "$quantity"
          }
      }
  ];
  
 
  const result = await rawMongoCollection.aggregate(pipeline, options).toArray();;
  console.log(result);

  //  var totalDiscount = 0;
  //  for (let invoice of invoices) {
  //    console.log(invoice)
  //    totalDiscount = totalDiscount + invoice.discount; 
  //    var totalPrice = 0;
  //     for (let invoiceItem of invoice.invoiceItems){
  //       totalPrice = invoiceItem.salePrice*invoiceItem.quantity;

  //     }
  //     invoice.totalPrice = totalPrice;
  //  }

  //  console.log(invoices);
  //  var custoTotal = 0;
  //   for (let item of result) {
  //     custoTotal = custoTotal + item.totalCost;
  //   }

  //   for (let item of result) {

  //     var contribuicaoCusto = ((item.totalCost*100)/custoTotal)/100;
 

  //     item.totalCost = item.totalCost+(item.totalCost*contribuicaoCusto);
     
  //   }


    return exits.success({
      currentSection: 'welcome',
      invoiceItems: result,
    });

  }


};

