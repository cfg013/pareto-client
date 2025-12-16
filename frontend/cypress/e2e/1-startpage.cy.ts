/// <reference types="cypress" />

describe('Pareto start page tests', () => {

    beforeEach(() => {
        cy.visit('https://pareto.space/en')
    })

    it('check English', () => {

        cy.get('.con-kit-component-button__label')
            .should('have.length.at.least', 15)
            .should('contain', 'Pareto client')
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

    it('check German', () => {

        // switch to DE
        cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"] > \
            .con-kit-component-link-group > .con-kit-component-button')
            .should('have.class', 'con-kit-component-button--type-line')
            .and('contain', 'DE')
            .and('be.visible')
            .click()

        // // for debugging: log all labels
        // cy.get('.con-kit-component-button__label').each(($elm) => {
        //     cy.wrap($elm).invoke('text').then((text) => {
        //         cy.log(text)
        //     })
        // })

        cy.get('.con-kit-component-button__label')
            .should('have.length.at.least', 19) 
            .should('contain', 'Pareto Projekt')
            .and('contain', 'EN')
            .and('contain', 'Pareto Secure-Mail')
            .and('contain', 'Zur Pareto-Bildergalerie')
            .and('contain', 'Newsletter-Tool mit Mailverteiler')
            .and('contain', 'Zur Friedenstaube')
            .and('contain', 'Pareto Quellcode')
            .and('contain', 'KONTAKTIERE UNS')
            .and('contain', 'Pareto-Wiki')
            .and('contain', 'TESTE PARETO')
            .and('contain', 'Technischer Support')
            .and('contain', 'Kontakt zum Team')

        // check correct button label and switch back to EN
        cy.get('[data-id="2wFZJQqEi7-JxIFBnGjp9"] > .con-kit-component-link-group > \
            .con-kit-component-button')
            .should('contain', 'EN')
            .click()

        // check EN
        cy.get('[data-id="cc721cdd-2e89-477e-84c4-734f5445580b"]').should('exist')
    })        
});
