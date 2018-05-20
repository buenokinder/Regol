module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/invoice/list',
        description: 'Display the Products List.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      var invoices = await Invoice.find();
      return exits.success({
        currentSection: 'invoice',
        invoices: invoices,
      });
  
    }
  
  
  };
  
  