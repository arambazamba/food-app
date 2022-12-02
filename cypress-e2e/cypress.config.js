const { defineConfig } = require('cypress')

module.exports = defineConfig({
  
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/results-[hash].xml',
  },
  video: false,
  e2e: {
    baseUrl: 'http://food-shop-ui-container.westeurope.azurecontainer.io/food',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
