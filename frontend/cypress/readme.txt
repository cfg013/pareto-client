How to setup and start Cypress tests

// initial one time setup (skip if already done)
- cd pareto-client/frontend
- npm install cypress --save-dev
(- npm install cypress-real-events) // only if needed for more reliable click events

// start test
- cd pareto-client/frontend
- npx cypress open
