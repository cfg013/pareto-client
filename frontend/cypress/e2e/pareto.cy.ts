/// <reference types="cypress" />      

//import { log } from "console"

describe('Pareto client test', () => {
  beforeEach(() => {
    cy.visit('https://pareto.space')
  })

  it('Check switching language', () => {
    let buttonDe = cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > \
      .con-kit-component-link-group > .con-kit-component-button')

      buttonDe
      .should('have.class', 'con-kit-component-button--type-line')
      .and('contain', 'DE')
      .and('be.visible')
      .click()

    cy.get('[data-id="2wFZJQqEi7-JxIFBnGjp9"] > .con-kit-component-link-group > \
      .con-kit-component-button')
      .should('contain', 'EN')
      .click()
            cy.get('span').each(($elm) => {
          cy.wrap($elm).invoke('text').then((text) => {
              if (text == "Error Message") {
                  //Do Something
              }
              else {
                  //Do Something
              }
          })
      })      

    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
      .con-kit-component-button')
      .should('contain', 'DE')

    // check there is an icon somewhere
    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
        .con-kit-component-button > .con-kit-component-icon > .con-kit-component-icon__border')
        .should('have.class', 'con-kit-component-icon__border')
        .and('have.attr', 'style')

    // with correct radius
    cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > .con-kit-component-link-group > \
        .con-kit-component-button > .con-kit-component-icon > .con-kit-component-icon__border')
        .should('have.class', 'con-kit-component-icon__border')      
        .invoke('attr', 'style')
        .should('equal', 'border-radius:100px')
  })


  it('Handling new Browser Tab', function () {
      cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
        .con-kit-component-link-group > .con-kit-component-button')
        .should('have.attr', 'target')

      cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
        .con-kit-component-link-group > .con-kit-component-button')          
        .invoke('removeAttr', 'target') // to prevent opening a new tab
        .click()

      cy.wait(5000)        
      cy.url().should('include', '/read')
      cy.get('._f769e4ba').contains('Sign in/up')

      cy.get('._f769e4ba').click()
      cy.get('body > dialog > nl-auth').find('button').contains('Log in').click()

      cy.get('h1').should('have.text','Log in')
      cy.log('hgjdhdjkakjfsdfhksdkfhskfhsfhuuhfufhufhfhufuhfafa')      
  })
})  


// // "print" the class name (noch nicht richtig verstanden)
//  cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"]')
//       .invoke('attr', 'class')
//       .then((classes) => {
//        cy.task('log', classes)
// });
