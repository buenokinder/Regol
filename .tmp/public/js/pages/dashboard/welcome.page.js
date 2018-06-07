
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
    months: [{ id: "1", name: "Janeiro"},
    { id: "2", name: "Fevereiro"},
    { id: "3", name: "Março"},
    { id: "4", name: "Abril"},
    { id: "5", name: "Maio"},
    { id: "6", name: "Junho"},
    { id: "7", name: "Julho"},
    { id: "8", name: "Agosto"},
    { id: "9", name: "Setembro"},
    { id: "10", name: "Outubro"},
    { id: "11", name: "Novembro"},
    { id: "12", name: "Dezembro"}],
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
