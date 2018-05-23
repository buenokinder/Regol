parasails.registerPage('fixedCost', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
    fixedCosts: [],
    companies: [],
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
      addFixedCostsFormData: {
        fixedCost: 
        {
          name: '',
          date: '',
          company: '',
          value: 0
        }
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
      selectedFixedCostUpdate: { fixedCost: undefined},
      selectedFixedCost: undefined,
      confirmRemoveFixedCostModalOpen: false,
      confirmRemoveFixedCostUpdateModalOpen: false,
    },
  
    virtualPages: true,
    html5HistoryMode: 'history',
    virtualPagesRegExp: new RegExp(/^\/fixedcost\/?([^\/]+)?/),
  
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
        this.goto('/fixedcost/new');
      },
  
      _clearAddFixedCostsModal: function() {
        this.goto('/fixedcost');
        // Reset form data.
        this.addFixedCostsFormData = {
          fixedCost: 
          {
            name: '',
            date: '',
            company: '',
            value: 0
          }
        };
        this.formErrors = {};
        this.cloudError = '';
      },
      _clearUpdateFixedCostsModal: function() {
        this.goto('/fixedcost');
        // Reset form data.
        this.addFixedCostsFormData = {
          fixedCost: 
          {
            name: '',
            date: '',
            company: '',
            value: 0
          }
        };
        this.confirmRemoveFixedCostUpdateModalOpen = false;
        this.formErrors = {};
        this.cloudError = '';
      },
      closeUpdateFixedCostsModal: function() {
        this.selectedFixedCostUpdate.fixedCost = {};
      },
      closeAddFixedCostsModal: function() {
        this._clearAddFixedCostsModal();
      },
  
      clickAddMoreButton: function() {
        this.addFixedCostsFormData.fixedCosts.push({
            name: '',
            costPrice: 0,
            salePrice: 0,
            code: '',
        });
      },
  
      handleParsingAddFixedCostsForm: function() {
        console.log('can you handle this?');
  
        this.formErrors = {};
  
        var argins = _.cloneDeep(this.addFixedCostsFormData);
  
        if (Object.keys(this.formErrors).length > 0) {
          return;
        }
  
        _.remove(argins.fixedCosts, {name: '', costPrice: 0 });
  
        return argins;
      },
      submittedUpdateFixedCostsForm: function() {
       var fixedCostReturn = {};
        var FixedCosts = _.filter(this.addFixedCostsFormData.fixedCosts, (fixedCost)=>{
          fixedCostReturn = fixedCost;
           return fixedCost;
         });
         console.log('FixedCosts:',fixedCostReturn);
  
       
        this._clearUpdateFixedCostsModal();
      },
  
      submittedAddFixedCostsForm: function() {
        var fixedCostReturn = {};
        var FixedCosts = _.filter(this.addFixedCostsFormData.fixedCosts, (fixedCost)=>{
          fixedCostReturn = fixedCost;
          return fixedCost;
        });
        console.log('FixedCosts:',fixedCostReturn);
  
        this.fixedCosts.unshift(fixedCostReturn);
        this._clearAddFixedCostsModal();
      },
  
      clickRemoveFixedCost: function(fixedCostId) {
        this.selectedFixedCost = _.find(this.fixedCosts, {id: fixedCostId});
        console.log('selectedFixedCost',this.selectedFixedCost);
  
        // Open the modal.
        this.confirmRemoveFixedCostModalOpen = true;
      },

      clickUpdateFixedCost: function(fixedCostId) {
        this.selectedFixedCostUpdate.fixedCost = _.find(this.fixedCosts, {id: fixedCostId});
        console.log('selectedFixedCost',this.selectedFixedCostUpdate.fixedCost);
  
        // Open the modal.
        this.confirmRemoveFixedCostUpdateModalOpen = true;
      },
  
      closeRemoveFixedCostModal: function() {
        this.selectedFixedCost = undefined;
        this.confirmRemoveFixedCostModalOpen = false;
        this.cloudError = '';
      },
  
      handleParsingRemoveFixedCostForm: function() {
        return {
          id: this.selectedFixedCost.id
        };
      },

      handleParsingUpdateFixedCostsForm: function() {

        console.log('can you handle this?');
  
        this.formErrors = {};
  
        var argins = _.cloneDeep(this.selectedFixedCostUpdate);
        console.log(argins);
        if (Object.keys(this.formErrors).length > 0) {
          return;
        }
  
        _.remove(argins.fixedCost, {name: '', costPrice: 0 });
        argins.id = argins.fixedCost.id;
        return argins;
        //return {
        //   id: this.selectedFixedCostUpdate.id
        // };
      },
  
      submittedRemoveFixedCostsForm: function() {
  
        _.remove(this.fixedCosts, {id: this.selectedFixedCost.id});
  
        // Close the modal.
        this.selectedFixedCost = undefined;
        this.confirmRemoveFixedCostModalOpen = false;
        this.cloudError = '';
      },
  
     
    },
  });