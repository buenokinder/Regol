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
    var totalSales =   await InvoiceItems.sum("salePrice");
    var totalCost =   await InvoiceItems.sum("costPrice");
   
    return exits.success({
      currentSection: 'welcome',
      totalCustomers: totalCustomers,
      totalSales: totalSales.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalProducts: totalProducts,
    });

  }


};
