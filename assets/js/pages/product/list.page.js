parasails.registerPage('product', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
  
    products: [],
  
      // The "virtual" portion of the URL which is managed by this page script.
      virtualPageSlug: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '',
        suffix: '  €',
        precision: 2,
        masked: false
      },
      // Form data
      addProductsFormData: {
        products: [
          {
            name: '',
            costPrice: 0,
            salePrice: 0,
            code: ''
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
  
      selectedProduct: undefined,
      confirmRemoveProductModalOpen: false,
    },
  
    virtualPages: true,
    html5HistoryMode: 'history',
    virtualPagesRegExp: new RegExp(/^\/product\/?([^\/]+)?/),
  
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
        this.goto('/product/new');
      },
  
      _clearAddProductsModal: function() {
        this.goto('/product');
        // Reset form data.
        this.addProductsFormData = {
        products: [
            {
                name: '',
                costPrice: 0,
                salePrice: 0,
                code: '',
            },
            {
                name: '',
                costPrice: 0,
                salePrice: 0,
                code: '',
            },
            {
                name: '',
                costPrice: 0,
                salePrice: 0,
                code: '',
            }
          ]
        };
        this.formErrors = {};
        this.cloudError = '';
      },
  
      closeAddProductsModal: function() {
        this._clearAddProductsModal();
      },
  
      clickAddMoreButton: function() {
        this.addProductsFormData.products.push({
            name: '',
            costPrice: 0,
            salePrice: 0,
            code: '',
        });
      },
  
      handleParsingAddProductsForm: function() {
        console.log('can you handle this?');
  
        this.formErrors = {};
  
        var argins = _.cloneDeep(this.addProductsFormData);
  
        if (Object.keys(this.formErrors).length > 0) {
          return;
        }
  
        _.remove(argins.products, {name: '', costPrice: 0 });
  
        return argins;
      },
  
      submittedAddProductsForm: function() {
        var productReturn = {};
        var Products = _.filter(this.addProductsFormData.products, (product)=>{
          productReturn = product;
          return product;
        });
        console.log('Products:',productReturn);
  
        this.products.unshift(productReturn);
        this._clearAddProductsModal();
      },
  
      clickRemoveProduct: function(productId) {
        this.selectedProduct = _.find(this.products, {id: productId});
        console.log('selectedProduct',this.selectedProduct);
  
        // Open the modal.
        this.confirmRemoveProductModalOpen = true;
      },
  
      closeRemoveProductModal: function() {
        this.selectedProduct = undefined;
        this.confirmRemoveProductModalOpen = false;
        this.cloudError = '';
      },
  
      handleParsingRemoveProductForm: function() {
        return {
          id: this.selectedProduct.id
        };
      },
  
      submittedRemoveProductsForm: function() {
  
        _.remove(this.products, {id: this.selectedProduct.id});
  
        // Close the modal.
        this.selectedProduct = undefined;
        this.confirmRemoveProductModalOpen = false;
        this.cloudError = '';
      },
  
     
    },
  });