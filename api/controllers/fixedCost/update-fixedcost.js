
module.exports = {


    friendlyName: 'Add Product',
  
  
    description: 'Add one or more Products.',
  
  
    inputs: {
  
    product: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: false
    },
        
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
      var product = inputs.product;
      
        var existingProduct = await Product.findOne({ id: product.id });
        console.log('VAI 1')
        if(existingProduct) {
          console.log('VAI')
          var retorno = await Product.update(existingProduct).set(product).fetch();
          console.log(retorno)
        }
      
  
      return exits.success();
  
    }
};
  