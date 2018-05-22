/**
 * <ajax-form>
 * -----------------------------------------------------------------------------
 * A form that talks to the backend using AJAX.
 * > For example usage, take a look at one of the forms generated in a new
 * > Sails app when using the "Web app" template.
 *
 * @type {Component}
 *
 * @slot default                     [form contents]
 *
 * @event update:cloudError          [.sync]
 * @event update:syncing             [.sync]
 * @event update:formErrors          [.sync]
 * @event submitted                  [emitted after the server responds with a 2xx status code]
 * @event rejected                   [emitted after the server responds with a non-2xx status code]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('caixa', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Note:
    // Some of these props rely on the `.sync` modifier re-introduced in Vue 2.3.x.
    // For more info, see: https://vuejs.org/v2/guide/components.html#sync-Modifier
    //
    // Specifically, these special props are:
    // • syncing
    // • cloudError
    // • formErrors
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


    props: ['qtd',
    'titulo',
    'url',
    'cor',
    'icone'],
    computed:{
        defineCor:function(){
          return "background-color: "+this.cor+" !important;"
        }
      },
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function (){
      return {
        //…
      };
    },
  
    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
    <div class="small-box" v-bind:style="defineCor">
    <div class="inner">
      <h3>{{qtd}}</h3>

      <p>{{titulo}}</p>
    </div>
    <div class="icon">
      <i v-bind:class="icone"></i>
    </div>
    <a v-bind:href="url" class="small-box-footer">
      Ver mais <i class="fa fa-arrow-circle-right"></i>
    </a>
  </div>
    `,
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
   
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
     
  
    }
  });
 