module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/fixedcost/list',
        description: 'Display the Products List.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      var fixedCosts = await FixedCost.find();
      var companies = await Company.find();
      return exits.success({
        currentSection: 'fixedCost',
        fixedCosts: fixedCosts,
        companies: companies,
      });
  
    }
  
  
  };
  
  