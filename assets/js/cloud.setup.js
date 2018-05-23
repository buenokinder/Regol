/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"list":{"verb":"GET","url":"/fixedcost","args":[]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"removeCustomer":{"verb":"DELETE","url":"/api/v1/customers/:id","args":["id"]},"addCustomer":{"verb":"POST","url":"/api/v1/customers","args":["customers"]},"updateCustomer":{"verb":"PUT","url":"/api/v1/customers/:id","args":["customers"]},"removeProduct":{"verb":"DELETE","url":"/api/v1/products/:id","args":["id"]},"addProduct":{"verb":"POST","url":"/api/v1/products","args":["products"]},"updateProduct":{"verb":"PUT","url":"/api/v1/products/:id","args":["product"]},"removeInvoice":{"verb":"DELETE","url":"/api/v1/invoices/:id","args":["id"]},"addInvoice":{"verb":"POST","url":"/api/v1/invoices","args":["invoice"]},"updateInvoice":{"verb":"PUT","url":"/api/v1/invoices/:id","args":["invoice"]},"removeCompany":{"verb":"DELETE","url":"/api/v1/companies/:id","args":["id"]},"addCompany":{"verb":"POST","url":"/api/v1/companies","args":["companies"]},"updateCompany":{"verb":"PUT","url":"/api/v1/companies/:id"},"removeFixedcost":{"verb":"DELETE","url":"/api/v1/fixedcosts/:id","args":["id"]},"addFixedcost":{"verb":"POST","url":"/api/v1/fixedcosts","args":["fixedCost"]},"updateFixedcost":{"verb":"PUT","url":"/api/v1/fixedcosts/:id","args":["product"]}}
  /* eslint-enable */

});
