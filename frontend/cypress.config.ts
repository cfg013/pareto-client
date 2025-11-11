import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    includeShadowDom: true,   // for "#shadow-root (open)" elements in DOM
    watchForFileChanges: true,
    viewportWidth: 1280,      // Pareto page is bigger than default width 1000
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
});

