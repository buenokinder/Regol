module.exports = {


    friendlyName: 'Remove Company',
  
  
    description: 'Remove a Company.',
  
  
    inputs: {
  
      id: {
        description: 'The id of the Company to remove',
        type: 'number',
        required: true
      },
  
    },
  
  
    exits: {
  
      notFound: {
        responseType: 'notFound'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
  
      var companyToRemove = await Company.findOne({ id: inputs.id });
  
        // Ensure the thing still exists.
        if(!companyToRemove) {
        throw 'notFound';
        }

        // Destroy the record.
        await Company.destroy({ id: inputs.id });

        return exits.success();
    }
  
  
  };
  