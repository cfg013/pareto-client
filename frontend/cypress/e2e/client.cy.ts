/// <reference types="cypress" />

describe('Pareto client page tests', () => {

    beforeEach(() => {
        cy.visit('https://pareto.space')
    })

    it.only('Login test ...', function () {

        // navigate to read page (click 'Pareto client')
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

        // check left button column
        cy.get('[class*="_8c1256c0 _4b80ae7e"]')
        .should('contain', 'Read')

        cy.get('[class*="_8c1256c0 _da18d2c2"]')
        .should('contain', 'Pictures')
        .and('contain', 'Search')
        .and('contain', 'Authors')
        .and('contain', 'About')

        cy.get('[class*="_ed18f445 _52b87e6c"]')
        .should('contain', 'Load more') 


        // cy.get('.con-kit-component-button__label').each(($elm) => {
        //     cy.wrap($elm).invoke('text').then((text) => {
        //         cy.log(text)
        //     })
        // })


        // cy.get('._f769e4ba').click()
        // cy.get('body > dialog > nl-auth').find('button').contains('Log in').click()

        // cy.get('h1').should('have.text','Log in')
        // cy.log('hgjdhdjkakjfsdfhksdkfhskfhsfhuuhfufhufhfhufuhfafa')      
    })

})

