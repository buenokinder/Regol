/**
 * Thing.js
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
        description: 'Customer Name.',
        required: true
      },
  
      email: {
        type: 'string',
        required: false,
        isEmail: true,
        maxLength: 200,
        example: 'carlos.bueno@apple.com'
      },
  
      telemovel: {
        type: 'string',
        required: false,
        description: ''
      },
  
 
  
    },
  
  };