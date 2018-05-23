
Vue.use(VueTheMask)
parasails.registerPage('invoice', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    invoices: [],
    companies: [],
    products: [],
    customers: [],
    product: '' ,
    quantity: 0,
    // product: {
    //   // name: '',
    //   // costPrice: 0,
    //   // salePrice: 0,
    //   // code: ''
    // },
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '  €',
      precision: 2,
      masked: false
    },
    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    addInvoicesFormData: {
      invoice: 
        {
          numero: '',
          date: '',
          fiscalDate: '',
          company: '',
          customer: '',
          discount: 0,
          total: 0,
          invoiceItems: []
        }
        
    },
    updateInvoicesFormData: {
      invoice: 
        {
          numero: '',
          date: '',
          fiscalDate: '',
          company: '',
          customer: '',
          discount: 0,
          total: 0,
          invoiceItems: []
        }
        
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
    selectedInvoiceItem: undefined,
    selectedInvoice: undefined,
    confirmRemoveInvoiceModalOpen: false,
    confirmUpdateInvoiceModalOpen: false,
    confirmRemoveInvoiceItemModalOpen: false,
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
  computed: {
    total: function() {
        if (!this.addInvoicesFormData.invoice.invoiceItems) {
            return 0;
        }

        var subTotal = this.addInvoicesFormData.invoice.invoiceItems.reduce(function (total, value) {
            return total + Number(value.salePrice*value.quantity);
        }, 0);
        this.addInvoicesFormData.invoice.total =subTotal-this.addInvoicesFormData.invoice.discount;
        return subTotal-this.addInvoicesFormData.invoice.discount;
    },  
    totalUpdate: function() {
      if (!this.updateInvoicesFormData.invoice.invoiceItems) {
          return 0;
      }

      var subTotal = this.updateInvoicesFormData.invoice.invoiceItems.reduce(function (total, value) {
          return total + Number(value.salePrice*value.quantity);
      }, 0);
      this.updateInvoicesFormData.invoice.total =subTotal-this.updateInvoicesFormData.invoice.discount;
      return subTotal-this.updateInvoicesFormData.invoice.discount;
  }
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
         invoice: 
        {
          numero: '',
          data: '',
          company: '',
          customer: '',
          discount: 0,
          total: 0,
          invoiceItems: []
        }
      };
      this.formErrors = {};
      this.cloudError = '';
    },
    _clearUpdateInvoicesModal: function() {
      this.goto('/invoice');
      // Reset form data.
      //  this.updateInvoicesFormData = {
      //     invoice: 
      //    {
      //      numero: '',
      //      data: '',
      //      name: '',
      //      company: {name: ''},
      //      customer: { name: ''},
      //      discount: 0,
      //      total: 0,
      //      invoiceItems: [{
            
      //      }]
      //    }
      //  };
      this.formErrors = {};
      this.cloudError = '';
    },
    closeUpdateInvoicesModal: function() {
      this._clearUpdateInvoicesModal();
    },

    closeAddInvoicesModal: function() {
      this._clearAddInvoicesModal();
    },

    clickAddMoreButtonUpdate: function() {
      
      this.updateInvoicesFormData.invoice.invoiceItems.push({
        quantity: this.quantity,
        product: this.product,
        costPrice: this.product.costPrice,
        salePrice: this.product.salePrice,
      });
    },
    clickAddMoreButton: function() {
      
      this.addInvoicesFormData.invoice.invoiceItems.push({
        quantity: this.quantity,
        product: this.product,
        costPrice: this.product.costPrice,
        salePrice: this.product.salePrice,
      });
    },
    handleParsingUpdateInvoicesForm: function() {
      console.log('handle update?');

      this.formErrors = {};

      var argins = _.cloneDeep(this.updateInvoicesFormData);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      _.remove(argins.invoice, {fullName: '', emailAddress: ''});
      argins.id = argins.invoice.id;
      return argins;
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
      


      this.invoices.unshift(this.addInvoicesFormData.invoice);
      this._clearAddInvoicesModal();
    },
    clickRemoveUpdateInvoiceItem: function(invoiceItem) {
      console.log(this.updateInvoicesFormData.invoice.numero) 
     
      this.selectedInvoiceItem = _.find(this.updateInvoicesFormData.invoice.invoiceItems, invoiceItem);
      this.selectedInvoiceItem['from']  = "update";
      console.log('selectedInvoiceItem',this.selectedInvoiceItem);
      this.confirmRemoveInvoiceItemModalOpen = true;
    },
    clickRemoveInvoiceItem: function(invoiceItem) {
      console.log(this.addInvoicesFormData.invoice.numero) 
      
      this.selectedInvoiceItem = _.find(this.addInvoicesFormData.invoice.invoiceItems, invoiceItem);
      this.selectedInvoiceItem['from'] = "add";
      console.log('selectedInvoiceItem',this.selectedInvoiceItem);
      this.confirmRemoveInvoiceItemModalOpen = true;
    },
    clickUpdateInvoice: function(invoiceId) {
      this.updateInvoicesFormData.invoice = _.find(this.invoices, {id: invoiceId});
      console.log('selectedInvoice',this.updateInvoicesFormData);

      // Open the modal.
      this.confirmUpdateInvoiceModalOpen = true;
    },
    clickRemoveInvoice: function(invoiceId) {
      this.selectedInvoice = _.find(this.invoices, {id: invoiceId});
      console.log('selectedInvoice',this.selectedInvoice);

      // Open the modal.
      this.confirmRemoveInvoiceModalOpen = true;
    },
    closeRemoveInvoiceItemModal: function() {
      this.selectedInvoiceItem = undefined;
      this.confirmRemoveInvoiceModalItemOpen = false;
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

    handleParsingRemoveInvoiceItemForm: function() {
      return {
        id: this.selectedInvoiceItem.id
      };
    },

    submittedRemoveInvoiceForm: function() {

      _.remove(this.invoices, {id: this.selectedInvoice.id});

      // Close the modal.
      this.selectedInvoice = undefined;
      this.confirmRemoveInvoiceModalOpen = false;
      this.cloudError = '';
    },
    submittedRemoveInvoiceItemForm: function(from) {
      if(this.selectedInvoiceItem.from == "add")
      _.remove(this.addInvoicesFormData.invoice.invoiceItems,  this.selectedInvoiceItem);
    else
      _.remove(this.updateInvoicesFormData.invoice.invoiceItems,  this.selectedInvoiceItem);

      // Close the modal.
      this.selectedInvoiceItem = undefined;
      this.confirmRemoveInvoiceItemModalOpen = false;
      this.cloudError = '';
    },

   
  },
});