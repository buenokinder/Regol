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
    name: {
      type: 'string',
      description: 'Product Name.',
      required: true
    },
    code: {
      type: 'string',
      description: 'Product Code.',
      required: false
    },

    costPrice: {
      type: 'number',
      required: true
    },

    salePrice: {
      type: 'number',
      required: true
    },
    userGroupd: {
      model: 'userGroup',
      required: false
    },


  },

};

