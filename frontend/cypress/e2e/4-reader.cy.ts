/// <reference types="cypress" />


describe('/read page tests', () => {

    beforeEach(() => {
        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(1000)        
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
    })

    it('set and delete bookmarks', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // the interaction-icon-bookmark-buttons need time to appear
        cy.wait(5000)

        // check bookmark exist with 1 item
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        // bookmark a random article
        // random because the bookmark icon buttons in the "Read" pane toggle,
        // so clicking a bookmarked item un-bookmarks it...
        let index = Math.round(Math.random() * 50)

        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')

        cy.getByData('interaction-icon-bookmark-button')        
        .eq(index)
        .click()

        // sometimes it needs time to update the count
        cy.wait(2000)

        // check bookmark exist with 2 items
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ②')

        // bookmark another random article
        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')

        cy.getByData('interaction-icon-bookmark-button')        
        .eq(index+1)
        .click()

        // check bookmark exist with 3 items and go to bookmark page
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ③')
        .click()

        cy.location("pathname").should("eq", "/bookmarks")        

        // delete the latest added bookmarks again
        cy.getByData('interaction-icon-bookmark-button')
        .first()
        .click()

        cy.wait(5000)

        cy.getByData('interaction-icon-bookmark-button')
        .first()
        .click()

        cy.wait(5000)

        // check bookmark exist with 1 item
        cy.get('body > div > div > div > aside > div > div > span')
        .should('be.visible')
        .contains('Bookmarks ①')    
    })

    it('delete last bookmark', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // check bookmark exist with 1 item
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        // and click "Bookmark"-button
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .click()

        cy.location("pathname").should("eq", "/bookmarks")

        cy.wait(5000)

        // delete bookmark
        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div > button')
        .should('be.visible')

        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div > button')
        .first()
        .click()

        // check bookmark button gone
        cy.wait(1000)
        cy.get('body > div > div > div > aside > div')
        .children()
        .should('have.length', 6)

        // wait a bit longer and check whether deleted bookmark re-appears
        cy.wait(10000)
        cy.get('body > div > div > div > aside > div')
        .children()
        .should('have.length', 6)

        // restore state before test
        // bookmark the latest article
        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')

        cy.getByData('interaction-icon-bookmark-button')        
        .first()        
        .click()

        // check bookmark exist with 1 item (bookmark was inserted before "Authors"
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')
    })
})

