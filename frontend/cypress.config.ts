import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
    "watchForFileChanges":true,
    "viewportWidth": 1200,      // Pareto page is bigger than default width
    "experimentalStudio":true,  // for Recorder
  },
});

module.exports = {
  e2e: {
    includeShadowDom:true
  }
}
