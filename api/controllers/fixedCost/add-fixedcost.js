
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
  
      function compareDate(str1){
       
        var dt1   = parseInt(str1.substring(0,2));
        var mon1  = parseInt(str1.substring(3,5));
        var yr1   = parseInt(str1.substring(6,10));
        var date1 = new Date(yr1, mon1-1, dt1);
        return date1;
        }

      var fixedCost = inputs.fixedCost;
        var fixedCostNew = {};
      

        fixedCostNew.name = fixedCost.name;
        fixedCostNew.company = fixedCost.company.id;
        fixedCostNew.value = fixedCost.value;
        fixedCostNew.date = compareDate(fixedCost.date);
        

        var existingFixedCost = await FixedCost.findOne({ name: fixedCost.name });
  
        if(!existingFixedCost) {
          await FixedCost.create(fixedCostNew).fetch();
        }
     
  
      return exits.success();
  
    }
};
  