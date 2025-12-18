/// <reference types="cypress" />


describe('/read page tests (logged in)', () => {

    beforeEach(() => {
        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(1000)        
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
    })

    // relies on existence of exactly one bookmark
    // this must be ensured upfront before you run the test
    // i haven't found a way to guarantee this condition here using Cypress
    // there is no conditional testing in Cypress (https://docs.cypress.io/app/guides/conditional-testing)
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

    // Todo: currently fails: last bookmark is not deleted (or better: re-appears after some seconds)
    // this is not always the case however, how many bookmarks re-appear is not deterministic
    // reloading the page can also bring back "deleted" bookmarks
    it('delete last bookmark', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        cy.wait(5000)

        // check bookmark exist with 1 item
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .should('be.visible')
        .contains('Bookmarks ①')

        cy.wait(5000)

        // and click "Bookmark"-button
        cy.get('body > div > div > div > aside > div > a:nth-child(4) > span')
        .click()

        cy.wait(1000)

        cy.location("pathname").should("eq", "/bookmarks")

        cy.wait(5000)

        // delete bookmark
        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div > button')
        .should('be.visible')

        cy.wait(1000)

        cy.get('#content-container > div > div > div._173135dd > div > div._537cd559 > div._1b5fdb8 > div > button')
        .first()
        .click()

        // check bookmark button gone
        cy.wait(1000)
        cy.get('body > div > div > div > aside > div')
        .children()
        .should('have.length', 6)

        // wait a bit longer and check whether deleted bookmark re-appears
        cy.wait(30000)
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

    it('follow/unfollow', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // click latest article
        cy.get('#content-container > div > div > div._173135dd > div:nth-child(1)')
        .click()

        cy.wait(3000)        

        // store the number of followers before following myself
        let num_followers_before: string
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._fcaabff1 > \
            div._f16bca58 > aside > section > div._9ebfe20c > div._a0677b2e > \
            div:nth-child(2) > div._bbc598df')
            .then(($div) => {
                  num_followers_before = $div.text();
            });
        
        cy.getByData('Follow')
        .click()

        // wait for updating number of followers
        cy.wait(10000)

        // check whether we have one more follower
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._fcaabff1 > \
            div._f16bca58 > aside > section > div._9ebfe20c > div._a0677b2e > \
            div:nth-child(2) > div._bbc598df')
            .then(($div) => {
                let num_followers_after = $div.text();
                cy.log(num_followers_before);
                cy.log(num_followers_after);
                expect(parseInt(num_followers_after) - parseInt(num_followers_before)).equal(1);
            });
        
        cy.getByData('Unfollow')
        .click()

        // wait for updating number of followers
        cy.wait(10000)

        // check whether we have one less follower
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._fcaabff1 > \
            div._f16bca58 > aside > section > div._9ebfe20c > div._a0677b2e > \
            div:nth-child(2) > div._bbc598df')
            .then(($div) => {
                expect($div.text()).equal(num_followers_before);
            });
    })

    it('follow author/Followed tab', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        cy.wait(5000)

        // check that "Followed" tab missing
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._9d51b360')
        .children()
        .should('have.length', 3)

        cy.wait(5000)        

        // click "Authors"
        cy.getByData('sidebar-item-Authors')
        .should('be.visible')
        .click()

        cy.wait(10000)

        // click "bookmark" to mark the first author in the list
        cy.get('#content-container > div > div > div:nth-child(1) > div._7090b945 > div._fc33df3e')
        .click()

        cy.wait(5000)

        // click Read button
        cy.getByData('sidebar-item-Read')
        .should('be.visible')
        .click()

        cy.wait(5000)

        // check that "Followed" tab appeared
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._9d51b360')
        .children()        
        .should('have.length', 4)
        .contains('Followed')

        cy.wait(2000)

        cy.getByData('category-read-followed')
        .should('be.visible')
        .click()
        
        cy.wait(2000)

        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._fcaabff1')
        .contains('Load more')

        cy.wait(5000)

        // restore initial condition: do unfollow
        cy.getByData('sidebar-item-Authors')
        .should('be.visible')
        .click()
        cy.wait(5000)
        cy.get('#content-container > div > div > div:nth-child(1) > div._7090b945 > div._fc33df3e')
        .click()
        cy.wait(20000)
        cy.getByData('sidebar-item-Read')
        .should('be.visible')
        .click()
        cy.wait(5000)        

        // check that "Followed" tab disappeared
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > div > div._9d51b360')
        .children()        
        .should('have.length', 3)
    })        

})

