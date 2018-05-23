
module.exports = {


    friendlyName: 'Add Product',
  
  
    description: 'Add one or more Products.',
  
  
    inputs: {
  
      fixedCost: {
        type: 'ref',
        description: 'The current incoming request (req).',
        required: false
      },
  
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      var fixedCost = inputs.fixedCost;
        var fixedCostNew = {};
        fixedCostNew.name = fixedCost.name;
        fixedCostNew.company = fixedCost.company.id;
        fixedCostNew.value = fixedCost.value;
        fixedCostNew.date = fixedCost.date;
        

        var existingFixedCost = await FixedCost.findOne({ name: fixedCost.name });
  
        if(!existingFixedCost) {
          await FixedCost.create(fixedCostNew).fetch();
        }
     
  
      return exits.success();
  
    }
};
  