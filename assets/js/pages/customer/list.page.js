parasails.registerPage('customer', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    customers: [],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    addCustomersFormData: {
      customers: [
        {
          name: ''
        }
      ]
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `addCustomersFormData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

    selectedCustomer: undefined,
    confirmRemoveCustomerModalOpen: false,
  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: new RegExp(/^\/customer\/?([^\/]+)?/),

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickAddButton: function() {
      console.log('Feito');
      // Open the modal.
      this.goto('/customer/new');
    },

    _clearAddCustomersModal: function() {
      this.goto('/customer');
      // Reset form data.
      this.addCustomersFormData = {
        customers: [
          {
            name: '',
          }
        ]
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    closeAddCustomersModal: function() {
      this._clearAddCustomersModal();
    },

    clickAddMoreButton: function() {
      this.addCustomersFormData.customers.push({
        name: '',
        email: '',
        telemove: '',
      });
    },

    handleParsingAddCustomersForm: function() {
      console.log('can you handle this?');

      this.formErrors = {};

      var argins = _.cloneDeep(this.addCustomersFormData);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      _.remove(argins.customers, {fullName: '', emailAddress: ''});

      return argins;
    },

    submittedAddCustomersForm: function() {
      var customers = {};
      var Customers = _.filter(this.addCustomersFormData.customers, (customer)=>{
        console.log(customer.name)
        customers = customer;
        return customer != '';
      });
    

      this.customers.unshift(customers);
      this._clearAddCustomersModal();
    },

    clickRemoveCustomer: function(customerId) {
      this.selectedCustomer = _.find(this.customers, {id: customerId});
      console.log('selectedCustomer',this.selectedCustomer);

      // Open the modal.
      this.confirmRemoveCustomerModalOpen = true;
    },

    closeRemoveCustomerModal: function() {
      this.selectedCustomer = undefined;
      this.confirmRemoveCustomerModalOpen = false;
      this.cloudError = '';
    },

    handleParsingRemoveCustomerForm: function() {
      return {
        id: this.selectedCustomer.id
      };
    },

    submittedRemoveCustomerForm: function() {

      _.remove(this.customers, {id: this.selectedCustomer.id});

      // Close the modal.
      this.selectedCustomer = undefined;
      this.confirmRemoveCustomerModalOpen = false;
      this.cloudError = '';
    },

   
  },
});