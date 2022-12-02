const { defineConfig } = require('cypress')

module.exports = defineConfig({
  
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/results-[hash].xml',
  },
  video: false,
  e2e: {
    baseUrl: 'http://food-shop-ui-e2e-tests.westeurope.azurecontainer.io/',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
