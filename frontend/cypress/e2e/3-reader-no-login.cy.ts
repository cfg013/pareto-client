/// <reference types="cypress" />

//https://github.com/dmtrKovalenko/cypress-real-events
//import "cypress-real-events";

describe('/read page tests (not logged in)', () => {

    it('check buttons', function () {

        cy.visit('https://pareto.space/en')

        // navigate to read page (click 'Pareto client')
        cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
            .con-kit-component-link-group > .con-kit-component-button')
            .invoke('removeAttr', 'target') // use same tab for testing (prevent opening a new one)
            .click()
        
        cy.url().should('include', '/read')

        // check labels ...
        cy.get('._f769e4ba').contains('Sign in/up')
        
        // left button column
        cy.get('[class*="_8c1256c0 _4b80ae7e"]').should('contain', 'Read')
        cy.get('[class*="_8c1256c0 _da18d2c2"]')
        .should('contain', 'Pictures')
        .and('contain', 'Search')
        .and('contain', 'Authors')
        .and('contain', 'About')

        // bottom button
        cy.get('[class*="_ed18f445 _52b87e6c"]').should('contain', 'Load more')

        // 'Feedback' button class resides in shadow root (closed) - not accessible by Cypress
        // cy.get('f1-default-trigger__button')            
        //     .should('contain', 'Feedback')
    })


    it('Login-options', function () {

        cy.visit('https://pareto.space/read')

        // https://stackoverflow.com/questions/71497586/cypress-and-ts-unable-to-click-button-without-using-wait
        // without this nothing works, i tried: force:true on click(), realClick()
        cy.wait(1000) 

        // click Sign in/up
        cy.getByData('Sign in/up')
            .should('be.visible')
            .should('be.enabled')    
            .click()

        cy.contains('Welcome to Pareto!').should('be.visible')
        cy.contains('Pareto is part of the Nostr network.').should('be.visible')

        // click Log in
        cy.get('body > dialog > nl-auth')
            .find('button')
            .contains('Log in')
            .should('be.visible')
            .should('be.enabled')                            
            .click()

        // cancel login window: x action button upper right corner
        cy.get('body > dialog > nl-auth')
            .find('button:nth-child(3)')    
            .should('be.visible')
            .should('be.enabled')
            .click()

        // repeat above sequence
        cy.getByData('Sign in/up')
            .should('be.visible')
            .should('be.enabled')    
            .click()
        cy.contains('Welcome to Pareto!').should('be.visible')
        cy.contains('Pareto is part of the Nostr network.').should('be.visible')
        cy.get('body > dialog > nl-auth')
            .find('button')
            .contains('Log in')
            .should('be.visible')
            .should('be.enabled')                            
            .click()

        // click Connect
        cy.get('body > dialog > nl-auth')
            .find('button')
            .contains('Connect')
            .should('be.visible')
            .should('be.enabled')
            .click()
    })
})
