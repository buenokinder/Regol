Vue.component('v-select', VueSelect.VueSelect);
parasails.registerPage('company', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    companies: [],

    // The "virtual" portion of the URL which is managed by this page script.
    virtualPageSlug: '',

    // Form data
    addCompanysFormData: {
      companies: [
        {
          name: ''
        }
      ]
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `addCompanysFormData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,

    selectedCompany: undefined,
    confirmRemoveCompanyModalOpen: false,
  },

  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: new RegExp(/^\/company\/?([^\/]+)?/),

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
      this.goto('/company/new');
    },

    _clearAddCompanysModal: function() {
      this.goto('/company');
      // Reset form data.
      this.addCompanysFormData = {
        companies: [
          {
            name: ''
            
          }
        ]
      };
      this.formErrors = {};
      this.cloudError = '';
    },

    closeAddCompanysModal: function() {
      this._clearAddCompanysModal();
    },

    clickAddMoreButton: function() {
      this.addCompanysFormData.companies.push({
        name: '',
        email: '',
        telemove: '',
      });
    },

    handleParsingAddCompanysForm: function() {
      console.log('can you handle this?');

      this.formErrors = {};

      var argins = _.cloneDeep(this.addCompanysFormData);

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      _.remove(argins.companies, {fullName: '', emailAddress: ''});

      return argins;
    },

    submittedAddCompanysForm: function() {
      var companyRetorno = {};
      var Companys = _.filter(this.addCompanysFormData.companies, (company)=>{
        companyRetorno = company;
        return company.name;
      });
      console.log('Companys:',companyRetorno);

      this.companies.unshift(companyRetorno);
      this._clearAddCompanysModal();
    },

    clickRemoveCompany: function(companyId) {
      this.selectedCompany = _.find(this.companies, {id: companyId});
      console.log('selectedCompany',this.selectedCompany);

      // Open the modal.
      this.confirmRemoveCompanyModalOpen = true;
    },

    closeRemoveCompanyModal: function() {
      this.selectedCompany = undefined;
      this.confirmRemoveCompanyModalOpen = false;
      this.cloudError = '';
    },

    handleParsingRemoveCompanyForm: function() {
      return {
        id: this.selectedCompany.id
      };
    },

    submittedRemoveCompanyForm: function() {

      _.remove(this.companies, {id: this.selectedCompany.id});

      // Close the modal.
      this.selectedCompany = undefined;
      this.confirmRemoveCompanyModalOpen = false;
      this.cloudError = '';
    },

   
  },
});