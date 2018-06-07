module.exports = {


    friendlyName: 'Add Customers',
  
  
    description: 'Add one or more Customers.',
  
  
    inputs: {
  
    customers: {
        description: 'An array of customer to add as Customers.',
        type: [
          {
            name: 'string'
          }
        ],
        example: [
          {
            name: 'Carlos Bueno'
          }
        ],
        required: true
      }
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      for (let customer of inputs.customers) {
        var existingCustomer = await Customer.findOne({ name: customer.name });
        var newCustomer = {};
        newCustomer["name"] = customer.name;
        newCustomer.code =   customer.code;


        if(!existingCustomer) {
          await Customer.create(customer).fetch();
        }
      }//∞
  
      return exits.success();
  
    }
};
  