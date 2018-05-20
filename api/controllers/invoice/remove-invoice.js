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
  
      var productToRemove = await Product.findOne({ id: inputs.id });
  
        // Ensure the thing still exists.
        if(!productToRemove) {
        throw 'notFound';
        }

        // Destroy the record.
        await Product.destroy({ id: inputs.id });

        return exits.success();
    }
  
  
  };
  