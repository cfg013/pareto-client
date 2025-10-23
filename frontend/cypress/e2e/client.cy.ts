/// <reference types="cypress" />

describe('Pareto client page tests', () => {

    // beforeEach(() => {
    //     cy.visit('https://pareto.space/en')
    // })

    it.only('Login test ...', function () {

        cy.visit('https://pareto.space')

        // // navigate to read page (click 'Pareto client')
        // cy.get('[data-id="101c28f7-f195-41a8-956b-c22fdbb90b5f"] > \
        //     .con-kit-component-link-group > .con-kit-component-button')
        //     .invoke('removeAttr', 'target') // use same tab for testing (prevent opening a new one)
        //     .click()
        
        // cy.url().should('include', '/read')

        // // check labels ...
        // cy.get('._f769e4ba').contains('Sign in/up')

        // // left button column
        // cy.get('[class*="_8c1256c0 _4b80ae7e"]')
        //     .should('contain', 'Read')
        // cy.get('[class*="_8c1256c0 _da18d2c2"]')
        //     .should('contain', 'Pictures')
        //     .and('contain', 'Search')
        //     .and('contain', 'Authors')
        //     .and('contain', 'About')

        // // bottom button
        // cy.get('[class*="_ed18f445 _52b87e6c"]')
        //     .should('contain', 'Load more')

        // // 'Feedback' button class resides in shadow root - not accessible by Cypress
        // // cy.get('f1-default-trigger__button')            
        // //     .should('contain', 'Feedback')

        // // find the "N" button for "Nostr login", but click() doesn't work even with force?
        // cy.get('body').find('nl-banner').find('button.z-0').click({force:true})

        // // cy.get('._f769e4ba').click()
        // // cy.get('body > dialog > nl-auth').find('button').contains('Log in').click()

    })

})

