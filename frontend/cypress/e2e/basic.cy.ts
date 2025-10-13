/// <reference types="cypress" />      

  it.only('DE language', () => {
    cy.visit('https://pareto.space')

    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
      .con-kit-component-button > .con-kit-component-icon > .con-kit-component-icon__border')

    // cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
    //   .con-kit-component-button > .con-kit-component-icon')

//    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
//      .con-kit-component-button').should('contain', 'DE').click()

  })

  it('Pareto Client', () => {
    cy.visit('https://pareto.space')
    cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
      .con-kit-component-link-group > .con-kit-component-button > .con-kit-component-button__text \
       > .con-kit-component-button__label').click()
  })


