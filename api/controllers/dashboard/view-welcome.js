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
    var totalSales =   await Invoice.sum("total");
    var totalDiscount =   await Invoice.sum("discount");
    var totalItems =   await InvoiceItems.sum("quantity");
    var totalInvoice =   await Invoice.count();
    var totalItemsTotal =   await InvoiceItems.find();
    var totalItemsTotals = Number(0); 
    sails.log(totalItemsTotals)

    var total = totalItemsTotal.reduce(function (accumulator, currentValue) {
      console.log(currentValue.quantity);
      return accumulator + (currentValue.quantity*currentValue.salePrice);
    }, 0);

    var totalCost = totalItemsTotal.reduce(function (accumulator, currentValue) {
      console.log(currentValue.quantity);
      return accumulator + (currentValue.quantity*currentValue.costPrice);
    }, 0);

    var totalProductsSale = totalItemsTotal.reduce(function (accumulator, currentValue) {
      console.log(currentValue.quantity);
      return accumulator + (currentValue.quantity);
    }, 0);


    var averageProducstPrice =  (total/totalProductsSale)
    var totalFixedCost =   await FixedCost.sum("value");
    var averageContribuitionFixedCost =   (totalFixedCost/totalProductsSale);
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
    });

  }


};

