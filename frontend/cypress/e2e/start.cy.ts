/// <reference types="cypress" />

describe('Pareto start page tests', () => {

    beforeEach(() => {
        cy.visit('https://pareto.space')
    })

    it('check switching language', () => {

        // switch to DE
        cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > \
            .con-kit-component-link-group > .con-kit-component-button')
            .should('have.class', 'con-kit-component-button--type-line')
            .and('contain', 'DE')
            .and('be.visible')
            .click()

        // switch to EN            
        cy.get('[data-id="2wFZJQqEi7-JxIFBnGjp9"] > .con-kit-component-link-group > \
            .con-kit-component-button')
            .should('contain', 'EN')
            .click()

        // check correct button label
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

    it('Check buttons', () => {

        // cy.get('.con-kit-component-button__label').each(($elm) => {
        //     cy.wrap($elm).invoke('text').then((text) => {
        //         cy.log(text)
        // })
        
        let span = cy.get('.con-kit-component-button__label')

        span.should('have.length', 14) 

        span.should('contain', 'Pareto client')
            .and('contain', 'DE')
            .and('contain', 'Pareto Secure Mail')
            .and('contain', 'Pareto Image Gallery')
            .and('contain', 'Newsletter tool with mailing list')
            .and('contain', 'To the Peace Dove')
            .and('contain', 'Pareto source code')
            .and('contain', 'CONTACT US')
            .and('contain', 'Pareto wiki')
            .and('contain', 'JOIN AS TESTER')
            .and('contain', 'Technical support')
            .and('contain', 'Team contact')
    })        
})

    // cy.get('body').then(($body) => {
    //     cy.log($body.html());  // Logs the entire HTML for inspection
    // });

    // cy.get('span').each(($elm) => {
    //     cy.wrap($elm).invoke('text').then((text) => {
    //         cy.log(text)
    //     })
    // })

    // cy.get('.con-kit-component-button__label').each(($elm) => {
    //     cy.wrap($elm).invoke('text').then((text) => {
    //         cy.log(text)
    // })


// // "print" the class name (noch nicht richtig verstanden)
//  cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"]')
//       .invoke('attr', 'class')
//       .then((classes) => {
//        cy.task('log', classes)

