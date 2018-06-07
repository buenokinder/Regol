
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatEuro', function(value) {
  if (value) {
    return Number(value).toLocaleString("es-ES", {minimumFractionDigits: 2}) + " €"
  }
  return "0,00 €";
})

parasails.registerPage('welcome', {
  
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
    totalCustomers: 0,
    totalSales: 0,
    totalCost: 0,
    totalProducts: 0,
    month: null,
    dashboardModalVisible: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickOpenDashboardModalButton: async function() {
      this.dashboardModalVisible = true;
    },
    find: function() {

      location.href='/welcome?month=' + this.month.id
     

     //this.$router.push({name: 'userIndex', query: { page: '123' } });
    },
    closeDashboardModal: async function() {
      this.dashboardModalVisible = false;
    },

  }
});
