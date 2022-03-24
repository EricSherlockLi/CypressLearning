/* Cypress Class Assignment 1
    1. test 5 elements in the top banner of home page of https://cms-lyart.vercel.app/
    2. test to switch into different pages and swith back to main page
    3. test tob banner remains at top when scroll
    Tester: Eric Li
    Time: 15/03/2022
*/


describe('Home Page Test', () => {
    // Open website url for each test
    beforeEach(() => {
        cy.visit ("https://cms-lyart.vercel.app/");
    });

    /* 1. test 5 elements exist 
        pre-requisite: user open webpage by url
        expectation: user able to view 5 elements in the top banner
    */
    it('Verify 5 Elements', () => {
        cy.get("#menu > ul:nth-child(1) > li:nth-child(1) > a").should("be.visible");
        cy.get("#menu > ul:nth-child(1) > li:nth-child(2) > a").should("be.visible");
        cy.get("#logo").should("be.visible");
        cy.get("#menu > ul:nth-child(2) > li:nth-child(1) > a").should("be.visible");
        cy.get("#menu > ul:nth-child(2) > li:nth-child(2) > a").should("be.visible");
    });

    /* 2. test click to open new page and then can switch back to main page 
        pre-requisite: user open webpage by url
        expectation: user able switch between pages in the top banner
    */
   it('Swith between pages', () => {
    cy.get("#menu > ul:nth-child(1) > li:nth-child(1) > a")
    .click()
    .get("#__next > div.content > div > div > h1")
    .should("be.visible")
    .get("#logo")
    .click()
    .get("#__next > section.posts > div > article:nth-child(1) > div.pic > img")
    .should("be.visible")
   });

   /* 3. test top banner remains at the top when scroll
        pre-requisite: user open webpage by url
        expectation: user able to view top banner when scroll to middle
    */

    it('Top banner remains at top', () => {
        // scroll to 250px down
        cy.scrollTo(0, 500)
        .get("#header")
        .should("be.visible")
    });

    /* 4. test user login status
        pre-requisite: user open webpage by url
        expectation: user able to check login status, and login with correct info
     */

    // it('Login status check', () => {
    //     // find login button
    //     cy.get("#menu > ul:nth-child(2) > li.header__SignIn-sc-19law7x-0.btYcai > a")
    //     .click()
    //     // click on Manager tab
    //     .get("#login_role > label:nth-child(3) > span:nth-child(2)")
    //     .click()
    //     // enter account and password
    //     .get("#login_email")
    //     .type("manager@admin.com")
    //     .get("#login_password")
    //     .type("111111")
    //     // click Sign in
    //     .get("#login > div:nth-child(5) > div > div > div > button")
    //     .click()
    //     .wait(500)
    //     // verify login successfully
    //     .get("#contentLayout > div")
    //     .should("be.visible")
    // });
});