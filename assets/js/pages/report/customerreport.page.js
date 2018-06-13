parasails.registerPage('customerreport', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      months: [{ id: "0", name: "Janeiro"},
      { id: "1", name: "Fevereiro"},
      { id: "2", name: "Março"},
      { id: "3", name: "Abril"},
      { id: "4", name: "Maio"},
      { id: "5", name: "Junho"},
      { id: "6", name: "Julho"},
      { id: "7", name: "Agosto"},
      { id: "8", name: "Setembro"},
      { id: "9", name: "Outubro"},
      { id: "10", name: "Novembro"},
      { id: "11", name: "Dezembro"}],
      month: null,
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
    methods: {

      find: function() {
  
        location.href='/productreport?month=' + this.month.id
       
    
       //this.$router.push({name: 'userIndex', query: { page: '123' } });
      },
    }
    
   
  
  });