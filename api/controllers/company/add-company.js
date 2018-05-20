
module.exports = {


    friendlyName: 'Add Company',
  
  
    description: 'Add one or more Companies.',
  
  
    inputs: {
  
    companies: {
        description: 'An array of Company to add as Companies.',
        type: [
          {
            name: 'string'
          }
        ],
        example: [
          {
            name: 'Company A'
          }
        ],
        required: true
      }
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      for (let company of inputs.companies) {
        
        var existingCompany = await Company.findOne({ name: company.name });
  
        if(!existingCompany) {
          await Company.create(company).fetch();
        }
      }//∞
  
      return exits.success();
  
    }
};
  