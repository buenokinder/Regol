module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
    this.req.setTimeout(240000);
    var db =  Customer.getDatastore().manager;
    console.log(InvoiceItems.tableName)
    var customerContext = db.collection(Customer.tableName);
    var productContext = db.collection(Product.tableName);
    var fixedCostContext = db.collection(FixedCost.tableName);
    var invoiceContext = db.collection(Invoice.tableName);

    var totalCustomers = 0; 
    customerContext.count(function(err, count) {
      sails.log("contei:" +  count)
      totalCustomers= count;
    })
    
    var totalProducts =  0;
    productContext.count(function(err, count) {
      sails.log("contei:" +  count)
      totalProducts= count;
    })

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    sails.log(firstDay);
    var totalSales =  0;// await Invoice.sum("total").where({
                        //                                  date: { '>': firstDay }});


    // invoiceContext.sum(function(err, count) {
    //   sails.log("contei:" +  count)
    //   totalProducts= count;
    // })
    var invoices =   await Invoice.find().populate('invoiceItems').where({
                                                            date: { '>': firstDay }});


    
    var total = 0;
    var totalItemsTotal = 0;
    var totalItems = 0;
    var totalInvoice = 0;
    var totalProductsSale = 0;
    var totalCost = 0;
    var soma = 0;
    for (let invoice of invoices) {
      soma = soma + invoice.total;
      sails.log('NF ' + invoice.total)
      sails.log('NF ' + invoice.numero)
      sails.log('Soma ' + soma)
      sails.log('----------------')
      totalInvoice = totalInvoice + 1;
      for (let invoiceItem of invoice.invoiceItems) {
        total = total + (invoiceItem.quantity*invoiceItem.salePrice)
        totalCost = totalCost + (invoiceItem.quantity*invoiceItem.costPrice)
        totalItems = totalItems + invoiceItem.quantity;
        totalProductsSale = totalItems;
        totalItemsTotal = totalItemsTotal + 1;
      }
    }

    var totalDiscount = 0; // await Invoice.sum("discount").where({
      //date: { '>': firstDay }});
   
    var totalInvoice =  0; // await Invoice.count();
   

    var averageProducstPrice =  (total/totalProductsSale)
    // var totalFixedCost = await FixedCost.sum("value").where({
    //  date: { '>': firstDay }});
   

     const totalFixedCost = await  fixedCostContext.aggregate([
      {$match: {}}
    ,
    { $group : { 
      _id: { month: "$month" },
      total: { $sum:  "$value" } } }, 
   
  ]).toArray();
console.log( totalFixedCost[0].total);
    var averageContribuitionFixedCost =   (totalFixedCost[0].total/totalProductsSale);

    var faturamentoSemPrejuizo = totalFixedCost[0].total/(averageProducstPrice/averageContribuitionFixedCost);
    var qtdProdutosEquilibrio = faturamentoSemPrejuizo/averageProducstPrice

    return exits.success({
      currentSection: 'welcome',
      totalCustomers: totalCustomers,
      totalSales: soma.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalProducts: totalProducts,
      totalItemsTotal: total.toFixed(2),
      totalFixedCost: totalFixedCost[0].total.toFixed(2),
      totalItems: totalItems,
      totalInvoices: totalInvoice,
      averageProducstPrice: averageProducstPrice.toFixed(2),
      averageContribuitionFixedCost: averageContribuitionFixedCost.toFixed(2),
      faturamentoSemPrejuizo:faturamentoSemPrejuizo.toFixed(0),
      qtdProdutosEquilibrio: qtdProdutosEquilibrio.toFixed(0),
      totalProductsSale: totalProductsSale.toFixed(0),
    });

  }


};

