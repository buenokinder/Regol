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
        type: 'number',
        description: 'Product Name.',
        required: true
      },
      date: {
        type: 'string',
        columnType: 'datetime'
      },
      fiscalDate: {
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
      oldid: {
        type: 'number',
        required: false
      },
    userGroupd: {
      model: 'userGroup',
      required: false
    },
    duplicated: {
      type: 'boolean',
      required: false
    },
  
    },
  
  };
  
  