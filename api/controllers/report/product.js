module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/repost/product',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    
    var invoiceItems =   await Invoice.find().populate('invoiceItems').where({
                                                            date: { '>': firstDay }}).groupBy('product','salePrice');

    // for (let invoice of invoices) {
      
    //   for (let invoiceItem of invoice.invoiceItems) {
    //     total = total + (invoiceItem.quantity*invoiceItem.salePrice)
    //     totalCost = totalCost + (invoiceItem.quantity*invoiceItem.costPrice)
    //     totalItems = totalItems + invoiceItem.quantity;
    //     totalProductsSale = totalItems;
    //     totalItemsTotal = totalItemsTotal + 1;
    //   }
    // }

    return exits.success({
      currentSection: 'welcome',
      invoiceItems: invoiceItems,
    });

  }


};

