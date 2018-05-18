module.exports = {


    friendlyName: 'Add Customers',
  
  
    description: 'Add one or more Customers.',
  
  
    inputs: {
  
    customers: {
        description: 'An array of customer to add as Customers.',
        type: [
          {
            name: 'string',
            email: 'string',
            telemovel: 'string'
          }
        ],
        example: [
          {
            name: 'Carlos Bueno',
            email: 'carlos.bueno@sapo.pt',
            telemovel: '919 584 328'
          }
        ],
        required: true
      }
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      for (let customer of inputs.customers) {
        var existingCustomer = await Customer.findOne({ email: customer.email });
  
        if(!existingCustomer) {
          await Customer.create(customer).fetch();
        }
      }//∞
  
      return exits.success();
  
    }
};
  