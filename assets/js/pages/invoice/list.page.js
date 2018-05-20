parasails.registerPage('invoice', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    invoices: [],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    addInvoicesFormData: {
      invoices: [
        {
          name: '',
          email: '',
          telemovel: ''
        }
      ]
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `addInvoicesFormData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

    selectedInvoice: undefined,
    confirmRemoveInvoiceModalOpen: false,
  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: new RegExp(/^\/invoice\/?([^\/]+)?/),

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
      this.goto('/invoice/new');
    },

    _clearAddInvoicesModal: function() {
      this.goto('/invoice');
      // Reset form data.
      this.addInvoicesFormData = {
        invoices: [
          {
            name: '',
            email: '',
            telemove: '',
          },
          {
            name: '',
            email: '',
            telemove: '',
          },
          {
            name: '',
            email: '',
            telemove: '',
          }
        ]
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    closeAddInvoicesModal: function() {
      this._clearAddInvoicesModal();
    },

    clickAddMoreButton: function() {
      this.addInvoicesFormData.invoices.push({
        name: '',
        email: '',
        telemove: '',
      });
    },

    handleParsingAddInvoicesForm: function() {
      console.log('can you handle this?');

      this.formErrors = {};

      var argins = _.cloneDeep(this.addInvoicesFormData);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      _.remove(argins.invoices, {fullName: '', emailAddress: ''});

      return argins;
    },

    submittedAddInvoicesForm: function() {
      
      var Invoices = _.filter(this.addInvoicesFormData.invoices, (invoice)=>{
        return invoice.name !== '' && invoice.email !== ''  && invoice.telemovel !== '';
      });
      console.log('Invoices:',Invoices);

      this.invoices.unshift(Invoices);
      this._clearAddInvoicesModal();
    },

    clickRemoveInvoice: function(invoiceId) {
      this.selectedInvoice = _.find(this.invoices, {id: invoiceId});
      console.log('selectedInvoice',this.selectedInvoice);

      // Open the modal.
      this.confirmRemoveInvoiceModalOpen = true;
    },

    closeRemoveInvoiceModal: function() {
      this.selectedInvoice = undefined;
      this.confirmRemoveInvoiceModalOpen = false;
      this.cloudError = '';
    },

    handleParsingRemoveInvoiceForm: function() {
      return {
        id: this.selectedInvoice.id
      };
    },

    submittedRemoveInvoiceForm: function() {

      _.remove(this.invoices, {id: this.selectedInvoice.id});

      // Close the modal.
      this.selectedInvoice = undefined;
      this.confirmRemoveInvoiceModalOpen = false;
      this.cloudError = '';
    },

   
  },
});