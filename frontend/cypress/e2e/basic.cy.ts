/// <reference types="cypress" />      

describe('Check switching language', () => {
  it.only('DE language', () => {
    cy.visit('https://pareto.space')

    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
      .con-kit-component-button > .con-kit-component-icon > .con-kit-component-icon__border')

    // maybe try to check whether the image besides the "DE" is there
    // ...

    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
      .con-kit-component-button').should('contain', 'DE').click()

    // cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
    //   .con-kit-component-button').should('contain', 'EN')
  })
})  

describe('Check opening new browser window for "Pareto Client"', () => {
  it('Handling new Browser Tab', function () {
      cy.visit('https://pareto.space')

      cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
        .con-kit-component-link-group > .con-kit-component-button')
        .should('have.attr', 'target')

      cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
        .con-kit-component-link-group > .con-kit-component-button')          
        .invoke('removeAttr', 'target') // to prevent opening a new tab
        .click()

      cy.url().should('include', '/read')
      cy.get('._f769e4ba').contains('Sign in/up')
  })
})  
