module.exports = {


    friendlyName: 'Remove Product',
  
  
    description: 'Remove a Product.',
  
  
    inputs: {
  
      id: {
        description: 'The id of the Product to remove',
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
  
      var invoiceToRemove = await Invoice.findOne({ id: inputs.id });
  
        // Ensure the thing still exists.
        if(!invoiceToRemove) {
        throw 'notFound';
        }

        // Destroy the record.
        await Invoice.destroy({ id: inputs.id });

        return exits.success();
    }
  
  
  };
  