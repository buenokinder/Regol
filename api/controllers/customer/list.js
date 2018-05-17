module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/customer/list',
      description: 'Display the Customer List for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
    var customers = await Customer.find();
    return exits.success({
      currentSection: 'customer',
      customers: customers,
    });

  }


};

