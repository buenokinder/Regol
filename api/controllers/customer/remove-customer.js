module.exports = {


    friendlyName: 'Remove Customer',
  
  
    description: 'Remove a Customer.',
  
  
    inputs: {
  
      id: {
        description: 'The id of the Customer to remove',
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
  
      var customerToRemove = await Customer.findOne({ id: inputs.id });
  
        // Ensure the thing still exists.
        if(!customerToRemove) {
        throw 'notFound';
        }

        // Destroy the record.
        await Customer.destroy({ id: inputs.id });

        return exits.success();
    }
  
  
  };
  