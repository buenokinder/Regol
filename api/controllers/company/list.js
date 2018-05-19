module.exports = {


    friendlyName: 'View welcome page',
  
  
    description: 'Display the dashboard "Welcome" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/product/list',
        description: 'Display the Products List.'
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      var products = await Product.find();
      return exits.success({
        currentSection: 'product',
        products: products,
      });
  
    }
  
  
  };
  
  