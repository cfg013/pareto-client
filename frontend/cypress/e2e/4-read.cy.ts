/// <reference types="cypress" />


describe('/read page tests', () => {

    beforeEach(() => {
        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(1000)        
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(5000)
    })

    it('bookmarks', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // check "Bookmark"-button not exist (if "Authors" exist then "Bookmark" is missing)
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Authors')

        // bookmark the latest article
        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')
        .last()
        .click()

        // check bookmark exist with 1 item (bookmark was inserted before "Authors"
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        // bookmark another article
        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')
        .first()
        .click()

        // check bookmark exist with 2 items
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ②')

        // delete bookmarks
        // click Bookmarks ② button
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ②')
        .click()

        // delete 1st bookmark
        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div')
        .should('be.visible')
        .first()
        .click()

        // check bookmark exist with 1 item                
        cy.get('body > div > div > div > aside > div > div > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        // delete 2nd bookmark        
        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div')
        .should('be.visible')
        .last()
        .click()

        // check "Bookmark"-button not exist (if "Authors" exist then "Bookmark" is missing)
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Authors')
    })

    it('bookmarks delete', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // check "Bookmark"-button not exist (if "Authors" exist then "Bookmark" is missing)
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Authors')

        cy.wait(2000)

        // bookmark the latest article
        cy.getByData('interaction-icon-bookmark-button')
        .should('be.visible')
        .should('be.enabled')
        .last()
        .click()

        cy.wait(5000)

        // check bookmark exist with 1 item (bookmark was inserted before "Authors"
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        // and click "Bookmark"-button
        .click()

        cy.location("pathname").should("eq", "/bookmarks")

        // delete again
        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div')
        .should('be.visible')
        .first()
        .click()

        cy.wait(5000)

        // check "Bookmark"-button not exist (if "Authors" exist then "Bookmark" is missing)
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Authors')

        cy.wait(5000)

        // click "Read"-button to re-load
        cy.get('body > div > div > div > aside > div > a:nth-child(1) > span')
        .should('be.visible')
        .contains('Read')
        .click()

        // wait a while to see whether deleted bookmark re-appears
        cy.wait(10000)

        // check "Bookmark"-button not exist (if "Authors" exist then "Bookmark" is missing)
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Authors')
    })        

})
