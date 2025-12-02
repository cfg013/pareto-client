/// <reference types="cypress" />

describe('Pareto uitest', () => {

    beforeEach(() => {
        cy.visit('https://pareto.space/uitest')
    })

    const text_long='saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_'+
    'saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext'+
    '_saulangertext_saulangertext_'

    it('Category selector', function () {

        // initial state of both categories
        cy.getByData('category-Category 1')
        .should('be.visible')
        .should('be.enabled')
        .should('not.be.focused')
        .should('not.be.selected')        
        cy.getByData('category-Category 2')
        .should('be.visible')
        .should('not.be.enabled')
        .should('not.be.focused')
        .should('not.be.selected')        

        // press button 1
        cy.getByData('category-Category 1').click()

        // check both categories
        cy.getByData('category-Category 1').should('not.be.enabled')
        cy.getByData('category-Category 2').should('be.enabled')

        // press button 2
        cy.getByData('category-Category 2').click()

        // check both categories
        cy.getByData('category-Category 1').should('be.enabled')
        cy.getByData('category-Category 2').should('not.be.enabled')

        // press button 1 again
        cy.getByData('category-Category 1').click()

        // check both categories
        cy.getByData('category-Category 1').should('not.be.enabled')
        cy.getByData('category-Category 2').should('be.enabled')                
    })        

    it('Dropdown', function () {

        cy.getByData('dropdown-test').contains("Dropdown item 2")
        .click()

        cy.contains('Dropdown item 1')
        .click()

        cy.getByData('dropdown-test').contains("Dropdown item 1")
        .click()

        cy.contains('No dropdown item')
        .click()

        cy.getByData('dropdown-test').contains("No dropdown item")
    })                

    it('Checkbox', function () {    

        // TODO: checkbox checked/unchecked indication fails
        // Wirkliches Verhalten ist genau umgekehrt.

        cy.getByData('checkbox-Checkbox label').should('be.checked')

        cy.getByData('checkbox-Checkbox label')
        .click()

        cy.getByData('checkbox-Checkbox label').should('not.be.checked')

        cy.getByData('checkbox-Checkbox label')
        .click()

        cy.getByData('checkbox-Checkbox label').should('be.checked')

    })                

    it('Interaction', function () {    

        cy.getByData('interaction-icon-comment-button').should('be.visible')
        cy.getByData('interaction-icon-like-button').should('be.visible')
        cy.getByData('interaction-icon-repost-button').should('be.visible')
        cy.getByData('interaction-icon-zap-button').should('be.visible')
        cy.getByData('interaction-icon-bookmark-button').should('be.visible')        

    })                

    it('Switch on/off label', function () {    

        // TODO: switch on/off indication fails
        // Wirkliches Verhalten ist genau umgekehrt.


        // initial
        cy.getByData('switch-Switch off label-Switch on label').should('be.visible')
        .should('be.checked')
        cy.get('#content-container > div > div > div > div:nth-child(6)')
        .contains('Switch on label')

        // toggle
        cy.get('#switch-knob').click()

        cy.getByData('switch-Switch off label-Switch on label').should('be.visible')
        .should('not.be.checked')
        cy.get('#content-container > div > div > div > div:nth-child(6)')
        .contains('Switch off label')

        // toggle again
        cy.get('#switch-knob').click()        

        cy.getByData('switch-Switch off label-Switch on label').should('be.visible')
        .should('be.checked')
        cy.get('#content-container > div > div > div > div:nth-child(6)')
        .contains('Switch on label')
    })                

    it('Buttons', function () {    

        // primary
        cy.getByData('primary-button-enabled').should('be.visible').and('be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(7)')
        .contains('primary button')

        cy.getByData('primary-button-disabled').should('be.visible').and('not.be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(8)')
        .contains('primary button (disabled')    

        // secondary        
        cy.getByData('secondary-button-enabled').should('be.visible').and('be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(9)')
        .contains('secondary button')

        cy.getByData('secondary-button-disabled').should('be.visible').and('not.be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(10)')
        .contains('secondary button (disabled')    

        // regular
        cy.getByData('regular-button-enabled')
        .scrollIntoView()

        cy.getByData('regular-button-enabled')        
        .should('be.visible').and('be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(11)')
        .contains('regular button with icons')

        cy.getByData('regular-button-disabled').should('be.visible').and('not.be.enabled')
        .contains('Category 1')

        cy.get('#content-container > div > div > div > div:nth-child(12)')
        .contains('regular button (disabled')

    })          
    
    it('Entry field', function () {        

        const text='eintrag'

        // check basics
        cy.getByData('entry-field-test')
        .scrollIntoView()
        .should('be.visible')
        .and('be.enabled')
        .and('be.empty')
        .and('not.be.focused')        
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(13)')
        .contains('entry field')

        cy.get('#content-container > div > div > div > div:nth-child(13) > div')
        .contains('Entry field label')

        cy.getByData('entry-field-test')
        .and('be.empty')
        .and('be.focused')

        // type, read, compare
        cy.getByData('entry-field-test')        
        .type(text)
        cy.get('#content-container > div > div > div > div:nth-child(13) > div > input')
        .invoke('val')
        .should('equal', text);

        // text mirrored in text area field beside the entry field
        cy.get('#content-container > div > div > div > div:nth-child(14) > div > textarea')
        .invoke('val')
        .should('equal', text);

        // clear, type, read, compare
        cy.getByData('entry-field-test')
        .and('be.empty')
        .and('be.focused')
        .clear()
        .type('newtext')
        cy.get('#content-container > div > div > div > div:nth-child(13) > div > input')
        .invoke('val')
        .should('equal', 'newtext');

        // check very long text
        cy.getByData('entry-field-test')
        .clear()        
        .type(text_long)

        cy.get('#content-container > div > div > div > div:nth-child(13) > div > input')
        .invoke('val')
        .should('equal', text_long);
    })          

    it('Text area', function () {        

        const text='eintrag'

        const text_lang='saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_\
        saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_saulangertext_saulangertext_saulangertext_saulangertext\
        _saulangertext_saulangertext_'

        // check basics
        cy.getByData('textarea-test')
        .scrollIntoView()
        .should('be.visible')
        .and('be.enabled')
        .and('be.empty')
        .and('not.be.focused')        
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(14)')
        .contains('text area')

        cy.get('#content-container > div > div > div > div:nth-child(14) > div')
        .contains('Text area label')

        cy.getByData('textarea-test')
        .and('be.empty')
        .and('be.focused')

        // type, read, compare
        cy.getByData('textarea-test')        
        .type(text)
        cy.get('#content-container > div > div > div > div:nth-child(14) > div > textarea')
        .invoke('val')
        .should('equal', text);

        // text mirrored in entry field beside the text area field
        cy.get('#content-container > div > div > div > div:nth-child(13) > div > input')
        .invoke('val')
        .should('equal', text);

        // clear, type, read, compare
        cy.getByData('textarea-test')
        .and('be.empty')
        .and('be.focused')
        .clear()
        .type('newtext')
        cy.get('#content-container > div > div > div > div:nth-child(14) > div > textarea')
        .invoke('val')
        .should('equal', 'newtext');
    })    

    it('Sharing button', function () {

        cy.getByData('sharing-button')
        .click()

        cy.get('#content-container > div > div > div > div:nth-child(15) > div > div > div')
        .should('be.visible')
        .should('contain', 'X')        
        .should('contain', 'Facebook')
        .should('contain', 'LinkedIn')
        .should('contain', 'Reddit')        
        .should('contain', 'Telegram')
        .should('contain', 'WhatsApp')
        .should('contain', 'Copy to clipboard')
        .should('contain', 'Share')                

        cy.getByData('copy-to-clipboard-button')
        .click({force: true})

        // this is flaky and doesn't work e.g. when saving test (watchForFileChanges:true mode)
        cy.get('#content-container > div > div > div > div:nth-child(15) > div > div > div')
        .should('not.exist')

        // TODO
        // check clipboard
    })    

    it('Sharing button - links', function () {

        cy.getByData('sharing-button').click()

        cy.getByData('twitter-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://twitter.com'))
        });

        cy.getByData('facebook-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://www.facebook.com'))
        });

        cy.getByData('linkedin-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://www.linkedin.com'))
        });

        cy.getByData('reddit-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://www.reddit.com'))
        });

        cy.getByData('telegram-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://t.me'))
        });

        cy.getByData('whatsapp-button')
        .invoke('attr', 'href')
        .then((hrefValue) => {
            assert(hrefValue?.match('https://wa.me'))
        });

        // check clicking a button
        cy.getByData('twitter-button')
        .invoke('removeAttr', 'target') // use same tab for testing (prevent opening a new one)
        .click()
        cy.url().should('include', 'x.com')
    })    

    it('Search bar', function () {

        cy.get('#content-container > div > div > div > div:nth-child(16)')
        .contains('search bar')
        .contains('No search value')

        cy.getByData('search-bar')
        .should('not.be.focused')
        .should('be.empty')
        .click()        

        const text = 'search something'
        cy.getByData('search-bar')
        .should('be.focused')
        .type(text)
        cy.get('#content-container > div > div > div > div:nth-child(16) > div > div > input')
        .invoke('val')
        .should('equal', text);

        cy.get('#content-container > div > div > div > div:nth-child(16)')
        .contains(text)

        // search a very long text
        cy.getByData('search-bar')
        .should('be.focused')
        .clear()
        .type(text_long)
        cy.get('#content-container > div > div > div > div:nth-child(16) > div > div > input')
        .invoke('val')
        .should('equal', text_long);

        cy.get('#content-container > div > div > div > div:nth-child(16)')
        .contains(text_long)

    })    

    it('Calendar', function () {

        // Freeze time at the specified date
        const now = new Date(2025, 10, 11) // 11th Nov
        cy.clock(now.getTime(), ['Date'])

        // re-visit
        cy.visit('https://pareto.space/uitest')        

        cy.get('#content-container > div > div > div > div:nth-child(1)')
        .should('be.visible')
        .contains("Calendar")
        .contains("November 2025")
        cy.get('#content-container > div > div > div > div:nth-child(1) > div')
        .contains("No date selected")

        // < button (monthly back)
        cy.get('#content-container > div > div > div > div:nth-child(1) > \
            div > div > div > div._50de4a0b > div._fc33df3e').click()
        cy.get('#content-container > div > div > div > div:nth-child(1)')
        .contains("October 2025")

        // > button (monthly forward)
        cy.get('#content-container > div > div > div > div:nth-child(1) > \
            div > div > div > div._50de4a0b > div:nth-child(3)').click()
        cy.get('#content-container > div > div > div > div:nth-child(1)')
        .contains("November 2025")

        // select date
        cy.get('#content-container > div > div > div > div:nth-child(1) > \
            div > div > div > div:nth-child(4) > div:nth-child(1)')
            .click()       
        cy.get('#content-container > div > div > div > div:nth-child(1) > div')
        .contains("Calendar date: November 3rd")

        // check future day not selectable
        cy.get('#content-container > div > div > div > div:nth-child(1) > \
            div > div > div > div:nth-child(5) > div:nth-child(3)')
            .click()
        cy.get('#content-container > div > div > div > div:nth-child(1) > div')
        .contains("Calendar date: November 3rd")

        // select another date
        cy.get('#content-container > div > div > div > div:nth-child(1) > \
            div > div > div > div:nth-child(4) > div:nth-child(2)')
            .click()       
        cy.get('#content-container > div > div > div > div:nth-child(1) > div')
        .contains("Calendar date: November 4th")
    })

});
