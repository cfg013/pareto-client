/// <reference types="cypress" />

describe('Settings tests', () => {

    beforeEach(() => {
        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(1000)        

        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
    })

    // All these awful cy.wait()s are necessary because if you click faster
    // these tests are very flaky: often a button is not visible or not enabled
    // or hidden or whatever. There is no reproducible behavior.
    // So I "simulated" human pace clicking by adding some wait time between clicks.


    it('outbox relays', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        // remove 2 relays (".first" means the first occurence of the button, which
        // appears twice:  in outbox and inbox relay list)
        cy.getByData('remove-relay-button-nos.lol')
        .first()
        .click()

        cy.wait(2000)

        cy.getByData('remove-relay-button-nostr.pareto.space')
        .first()
        .click()

        cy.wait(2000)        

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .click()

        cy.wait(2000)                

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .type('nos.lol')

        cy.getByData('outbox-relay-add-button')
        .click()

        cy.wait(2000)        

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

        cy.get('#content-container > div > div > div > div:nth-child(2) > div._d34dcd6')
        .children().should('have.length', 8)

        // remove a relay (".last" means the last occurence of the button, which
        // appears twice:  in outbox and inbox relay list)
        cy.getByData('remove-relay-button-nostr.wine')
        .last()
        .click()

        cy.wait(2000)        

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
//        .should('be.visible')
        .click()

        cy.wait(2000)        

        cy.get('#content-container > div > div > div > div:nth-child(2) > \
            div._21814cab > div._4df74c3 > input')
        .should('be.visible')
        .type('nostr.wine')

        cy.getByData('inbox-relay-add-button')
        .click()
    })    

    // Todo: fails at the moment because server is not deleted
    it.only('media servers tab', function () {

        cy.getByData('sidebar-item-Settings')    
        .click();

        cy.getByData('category-settings-media-servers')
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

        // without waiting profile is shown as empty!
        cy.wait(2000)

        cy.getByData('category-settings-profile')
        .click();

        cy.getByData('entry-field-Name')
        .should('have.value', 'Knarf') 
        .clear()
        .type('hallo')

        cy.getByData('entry-field-Name')
        .should('have.value', 'hallo')

        cy.getByData('Save')
        .click();

        cy.reload()
        cy.get('div > div > div.nl-bg.relative > nl-previously-logged > div:nth-child(2) > div > ul > li > div')
        .click()

        // without waiting profile is shown as empty!
        cy.wait(2000)

        cy.getByData('category-settings-profile')
        .click();

        cy.getByData('entry-field-Name')
        .should('have.value', 'hallo') 
        .clear()
        .type('Knarf')

        cy.getByData('Save')
        .should('be.enabled')
        .click();
    })    

    


});


