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
        required: false
      },

      costPrice: {
        type: 'number',
        required: false
      },
  
      salePrice: {
        type: 'number',
        required: false
      },
  
      invoice: {
        model: 'invoice'
      },
      
  
    },total: function () {
      var retorno = 0;
      retorno= Number(this.salePrice * this.quantity); 
      return _.omit(this, ['retorno']);
      }
  
  };
  
  