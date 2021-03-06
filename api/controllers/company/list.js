module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/company/list',
        description: 'Display the Products List.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      var companies = await Company.find();
      return exits.success({
        currentSection: 'company',
        companies: companies,
      });
  
    }
  
  
  };
  
  