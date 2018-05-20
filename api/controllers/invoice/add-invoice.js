
module.exports = {


    friendlyName: 'Add Product',
  
  
    description: 'Add one or more Products.',
  
  
    inputs: {
  
    invoices: {
        description: 'An array of Product to add as Products.',
        type: [
          {
            name: 'string',
            costPrice: 'number',
            salePrice: 'number',
            code: 'string'
          }
        ],
        example: [
          {
            name: 'Produto A',
            costPrice: 150,
            salePrice: 260,
            code: 'string'
          }
        ],
        required: true
      }
  
    },
  
  
    exits: {
  
    },
  
  
    fn: async function (inputs, exits) {
  
      for (let product of inputs.products) {
        
        var existingProduct = await Product.findOne({ name: product.name });
  
        if(!existingProduct) {
          await Product.create(product).fetch();
        }
      }//∞
  
      return exits.success();
  
    }
};
  