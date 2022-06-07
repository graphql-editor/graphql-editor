import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1568',
    supportFile: false,
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
  },
  chromeWebSecurity: false,
});
// {
//   "testFiles": "**/*.spec.ts",
//   "chromeWebSecurity": false,
//   "modifyObstructiveCode": false
// }
