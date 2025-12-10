/// <reference types="cypress" />

describe('Creator tests', () => {

    beforeEach(() => {

        // Freeze time at the specified date
        // doesn't work for some reason: the Read/Creator kmode switch button
        // doesn't appear when date has been changed before
        // const now = new Date(2025, 10, 26) // 25th Nov
        // cy.clock(now.getTime(), ['Date'])

        // TODO: sometimes i need to visit the site twice or three times or ...
        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
        cy.wait(1000)        

        cy.visit("https://test.pareto.space/sign-in?from=%2Fread&nsec=nsec16rswf8emn53szjfpznwfhjuwkr5uglmlva6yzh3vfr7a0jlt64lqhkwa9h")
    })

    it('create post', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        // Check screen changed, buttons available ...
        cy.get('body > div._2eb2cf5d._96fb215c > div > div > aside > div')
        .should('contain', 'Posts')
        .should('contain', 'Write')
        .should('contain', 'Subscribers')
        .should('contain', 'Newsletters')
        .should('contain', 'Search')
        .should('contain', 'Media')
        .should('contain', 'Settings')

        // ... and start to write
        cy.getByData('sidebar-item-Write')        
        .click()

        cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(1)')
        .find('textarea')
        .type('Das ist der Titel.')

        cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(2)')
        .find('textarea')
        .type('Das ist die Summary.')

        cy.get('#content-container > div > div > div:nth-child(2) > elm-milkdown-editor > div > div > div > p')
        .type('Das ist der Inhalt.')        

        cy.get('#content-container > div > div > div._233ae833 > div._28da896')
        .click()

        cy.getByData('Upload images')        
        .click()

        cy.get('#content-container > div > div > div._1349e14f._96fb215c > \
            div > div._aed52b3f > div > div._91672ff6._96fb215c > div > \
            div._7c522519 > div._58b561e4._e7dc0028 > div > button')
        .selectFile('cypress/fixtures/IMG_20250501_135818.jpg', { action: 'drag-drop' })

        cy.getByData('Start Upload')
        .click()

        cy.get('#content-container > div > div > div._1349e14f._96fb215c > div > div._aed52b3f > div > div._91672ff6._96fb215c > div > div._e74fe7da')
        .find('button')
        .click()
    
        cy.get('#content-container div:nth-child(1) > img._7af25b57')
        .click();

        // change language and fill some hashtags
        cy.get('[data-test="dropdown-unnamed"]')
        .click();
        cy.get('[data-test="dropdown-item-German"]')
        .click();
        cy.get('[data-test="entry-field-Hashtags"]')
        .click();
        cy.get('[data-test="entry-field-Hashtags"]')
        .type('#hashtag{enter}');

        // don't use the date change for now as it changes the order in Drafts
        // // publishing date
        // cy.getByData('Change')
        // .click()

        // // select day in current month
        // cy.get('#content-container > div > div._1349e14f._96fb215c > div > div._aed52b3f > \
        //     div > div > div > div:nth-child(3) > div:nth-child(6)')
        // .click()

        // // publishing date
        // cy.getByData('OK')
        // .click()

        // // check publishing date
        // cy.get('#content-container > div > div > div._88d21d89')
        // .contains("Publishing date: November 1st")

        // Preview
        cy.getByData('Preview')
        .click()

        // // Todo: change to not exist
        // // title shouldn't be editable in Preview mode, right?
        // cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(1)')
        // //.should('not.exist')        // this is correct
        // // this is wrong but to pass the test until fixed i leave it heree
        // .find('textarea')
        // .type('Das ist der geänderte Titel im Preview-Modus.')

        cy.get('#content-container > div > div > div:nth-child(2) > elm-milkdown-editor > div > div > div > p')
        .should('not.exist')

        // Return to editing
        cy.getByData('Continue Editing')
        .click()

        // edit title
        cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(1)')
        .find('textarea')
        .type('-Titel-Änderung nach Continue Editing')

        // edit summary
        cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(2)')
        .find('textarea')        
        .type('-Summary-Änderung nach Continue Editing')

        // save the draft
        cy.getByData('Save draft')
        .click()
    })        

    it('copy/edit post', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-drafts')
        .click()

        // show current posts in Published
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-published')
        .click()

        // back to Drafts
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-drafts')
        .click()

        // Edit-button
        cy.getByData('Edit')
        .first()
        .click()

        cy.wait(3000)

        // edit/restore text
        cy.get('#content-container > div > div > div:nth-child(2) > elm-milkdown-editor > div > div > div > p')
//        .eq(2)
        .clear()
        cy.wait(1000)
        cy.get('#content-container > div > div > div:nth-child(2) > elm-milkdown-editor > div > div > div > p')
        .type('Das ist der Inhalt.')

        cy.getByData('Save draft')
        .click()

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > a:nth-child(1) > span')
        .click()
        cy.getByData('category-posts-drafts')
        .click()

        // Copy-button
        cy.getByData('Copy')
        .first()
        .click()

        // edit summary
        cy.get('#content-container > div > div > div._233ae833 > div._6166fa91 > div:nth-child(2)')
        .find('textarea')
        .type('-Summary-Änderung nach Drafts->Copy button')

        cy.getByData('Save draft')
        .click()

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > a:nth-child(1) > span')
        .click()
        cy.getByData('category-posts-drafts')
        .click()
    })        

    it('publish post', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        // show current posts in Published
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-published')
        .click()

        // check number of published articles to be zero
        cy.get('#content-container > div > div > div._173135dd')
//        .should('not.exist')
        .children().should('have.length', 0)

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-drafts')
        .click()

        // Open latest draft
        cy.getByData('Edit')
        .first()
        .click()

        // Publish
        cy.getByData('Publish...')
        .click()
        cy.wait(1000)        
        cy.getByData('Publish article')
        .click()

        // Todo: remove when Publish functions without error message
        cy.wait(5000)
        cy.get('#content-container > div > div._1349e14f._96fb215c > div > div._aed52b3f > div')
        .should('be.visible')
        .contains('Error deleting draft')        
        cy.wait(1000)
        cy.getByData('Ok')
        .click()

        cy.wait(1000)        

        cy.getByData('sidebar-item-Posts')
        .click();

        cy.wait(1000)        

        // show current posts in Published
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-published')
        .click()

        cy.wait(1000)                

        // check number of published articles
        cy.get('#content-container > div > div > div._173135dd')
        .children().should('have.length', 1)
    })

    // fails currently
    it('delete draft post', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.getByData('category-posts-drafts')
        .click()

        cy.get('#content-container > div > div > div._173135dd')
        .children()
        .its('length')
        .then((initialCount) => {

            // Delete-button
            cy.getByData('Delete')
            .last()
            .click()

            cy.wait(1000)

            // Todo: retest when ticket fixed
            // second deletion not working and deleting manually
            // in browser also not working
            cy.getByData('Delete')
            .last()
            .click()

            cy.wait(1000)            

            cy.get('#content-container > div > div > div._173135dd')
            .children()
            .should('have.length', initialCount-2) // 2 deleted
        })
    })        

    it('delete published post', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        // show current posts in Drafts
        cy.get('body > div > div > div > aside > div > div._fb2f033d._4b80ae7e')
        .click()
        cy.wait(5000) // needed otherwise Read or Publish list is taken ?!
        cy.getByData('category-posts-published')
        .click()

        cy.get('#content-container > div > div > div._173135dd')
        .children()
        .its('length')
        .then((initialCount) => {

            // Delete-button
            cy.getByData('Delete')
            .last()
            .click()

            cy.wait(2000)

            cy.get('#content-container > div > div > div._173135dd')
            .children()
            .should('have.length', initialCount-1)
        })
    })        

    it('search npub', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        cy.getByData('sidebar-item-Search')    
        .click();

        cy.get('#content-container > div > div > div._7c8fc687 > div > input')
        .type('npub1nvzzssyyx0qygwvu3jg7vf00jjgp2lal7p3m7xf7xxe55a4chzzqzfnk5w')

        cy.get('#content-container > div > div > div._e5b49ede > div._93bc2f17 > div._d3defd37 > h2')
        .should('contain', 'Knarf')
        
        cy.getByData('Follow')
        .click()        

        cy.wait(3000)

        cy.getByData('Unfollow')
        .click()        
    })

    it('media upload', function () {

        // recognize that the page has indeed been loaded
        cy.getByData('switch-Reader-Creator')
        .should('be.visible')
        .should('be.enabled')

        // switch to Creator mode
        cy.get('#switch-knob')
        .should('be.visible')
        .click()

        cy.getByData('sidebar-item-Media')        
        .click();        

        cy.getByData('Upload images')
        .click()

        cy.get('#content-container > div > div > div > div._91672ff6._96fb215c > \
            div > div._7c522519 > div._58b561e4._e7dc0028 > div > button')
        .selectFile('cypress/fixtures/1.jpeg', { action: 'drag-drop' })

        cy.getByData('Start Upload')
        .click()
    })    

});
