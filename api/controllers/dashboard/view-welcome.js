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
    var totalCustomers =   await Customer.count();
    var totalProducts =   await Product.count();

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    sails.log(firstDay);
    var totalSales =   await Invoice.sum("total").where({
                                                          date: { '>': firstDay }});

    var invoices =   await Invoice.find().populate('invoiceItems').where({
                                                            date: { '>': firstDay }});


    
    var total = 0;
    var totalItemsTotal = 0;
    var totalItems = 0;
    var totalInvoice = 0;
    var totalProductsSale = 0;
    var totalCost = 0;
    for (let invoice of invoices) {
      totalInvoice = totalInvoice + 1;
      for (let invoiceItem of invoice.invoiceItems) {
        total = total + (invoiceItem.quantity*invoiceItem.salePrice)
        totalCost = totalCost + (invoiceItem.quantity*invoiceItem.costPrice)
        totalItems = totalItems + invoiceItem.quantity;
        totalProductsSale = totalItems;
        totalItemsTotal = totalItemsTotal + 1;
      }
    }

    var totalDiscount = await Invoice.sum("discount").where({
      date: { '>': firstDay }});
   
    var totalInvoice =   await Invoice.count();
   

    var averageProducstPrice =  (total/totalProductsSale)
    var totalFixedCost =   await FixedCost.sum("value");
   
    var averageContribuitionFixedCost =   (totalFixedCost/totalProductsSale);

    var faturamentoSemPrejuizo = totalFixedCost/(averageProducstPrice/averageContribuitionFixedCost);
    var qtdProdutosEquilibrio = faturamentoSemPrejuizo/averageProducstPrice

    return exits.success({
      currentSection: 'welcome',
      totalCustomers: totalCustomers,
      totalSales: totalSales.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalProducts: totalProducts,
      totalItemsTotal: total.toFixed(2),
      totalFixedCost: totalFixedCost.toFixed(2),
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

