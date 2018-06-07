parasails.registerPage('customerreport', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
    invoices: [],
  
  
  
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `addCustomersFormData`.
      formErrors: { /* … */ },
  
      // Syncing / loading state
      syncing: false,
  
      // Server error state
      cloudError: '',
  
      // Success state when form has been submitted
      cloudSuccess: false,
      selectedcustomerUpdate: { customer: undefined},
      selectedcustomer: undefined,
      confirmRemovecustomerModalOpen: false,
      confirmRemovecustomerUpdateModalOpen: false,
    },
  
    computed: {
      // total: function(){

      //   let total = [];
      
      //   Object.entries(this.invoiceItems).forEach(([key, val]) => {
      //       total.push(val.totalPrice-val.totalCost) // the value of the current key.
      //   });
      
      //   return total.reduce(function(total, num){ return total + num }, 0);
      
      // }   ,
      // totalCusto: function(){

      //   let total = [];
      
      //   Object.entries(this.invoiceItems).forEach(([key, val]) => {
      //       total.push(val.totalCost) // the value of the current key.
      //   });
      
      //   return total.reduce(function(total, num){ return total + num }, 0);
      
      // }  ,
      // totalVendas: function(){

      //   let total = [];
      
      //   Object.entries(this.invoiceItems).forEach(([key, val]) => {
      //       total.push(val.totalPrice) // the value of the current key.
      //   });
      
      //   return total.reduce(function(total, num){ return total + num }, 0);
      
      // }  
      
      

    },
    
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    
   
  
  });