/**
 * Products.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
    
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
      product: {
        model: 'product'
      },
      
      quantity: {
        type: 'number',
        required: true
      },

      costPrice: {
        type: 'number',
        required: true
      },
  
      salePrice: {
        type: 'number',
        required: true
      },
  
      invoice: {
        model: 'invoice'
      }
  
    },
  
  };
  
  