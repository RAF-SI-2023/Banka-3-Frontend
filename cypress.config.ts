import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    videoCompression: 20,
    defaultCommandTimeout: 60000,
    taskTimeout: 60000,
    execTimeout: 60000
  },
  projectId: 'abc123',
});
