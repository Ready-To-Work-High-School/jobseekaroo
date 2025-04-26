
module.exports = {
  projectId: "cimaft",
  // Add any additional Cypress configuration options below
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
};
