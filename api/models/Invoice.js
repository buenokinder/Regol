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
      numero: {
        type: 'string',
        description: 'Product Name.',
        required: true
      },
      date: {
        type: 'string',
        columnType: 'datetime'
      },
      company: {
        model: 'company'
      },
      customer: {
        model: 'customer'
      },
      invoiceItems: {
        collection: 'invoiceItems',
        via: 'invoice'
      },
      discount: {
        type: 'number',
        required: true
      },
      total: {
        type: 'number',
        required: true
      },
  
    },
  
  };
  
  