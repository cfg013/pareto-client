/// <reference types="cypress" />

describe('Settings tests', () => {

    beforeEach(() => {
        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        // cy.wait(1000)        

        // cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
    })

    it('outbox relays', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        // remove 2 relays
        cy.getByData('remove-relay-button-nos.lol')
        .first()
        .click()

        cy.getByData('remove-relay-button-nostr.pareto.space')
        .first()
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .type('nos.lol')

        cy.getByData('outbox-relay-add-button')
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .type('nostr.pareto.space')

        cy.getByData('outbox-relay-add-button')
        .click()
    })

    it('inbox relays', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        // remove a relay
        cy.getByData('remove-relay-button-nostr.wine')
        .last()
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .type('nostr.wine')

        // sometimes Add-button needs time
        cy.wait(10000)

        cy.getByData('inbox-relay-add-button')
        .should('be.visible')
        .should('be.enabled')
        .click()
    })    

    it('media servers tab', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        cy.getByData('category-Media Servers')
        .click();    

        // check server list empty
        cy.get('#content-container > div > div > div > div:nth-child(1) > div._d34dcd6')
        .should('not.exist')

        // add server
        cy.getByData('Add default media servers')
        .should('be.visible')
        .should('be.enabled')
        .click()

        // check server added
        cy.get('#content-container > div > div > div > div:nth-child(1) > div._d34dcd6')
        .children().should('have.length', 1)

        cy.wait(5000)

        // try to delete media server
        cy.get('#content-container > div > div > div > div:nth-child(1) > div._d34dcd6 > div > div._c79d4e89')
        .should('be.visible')
        .click()

        cy.wait(10000)

        // Todo: fails at the moment because server is not deleted
        // check server deleted
        cy.get('#content-container > div > div > div > div:nth-child(1) > div._d34dcd6')
        .should('not.exist')
        
    })    

    it('profile tab', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        cy.getByData('category-Profile')
        .click();    
    })    


});

