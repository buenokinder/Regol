/**
 * FixedCost.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
    
      //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
      //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
      //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

      date: {
        type: 'string',
        columnType: 'datetime'
      },
      name: {
        type: 'string',
      },
      company: {
        model: 'company'
      },
      value: {
        type: 'number',
        required: true
      }
  
    },
  
  };
  
  