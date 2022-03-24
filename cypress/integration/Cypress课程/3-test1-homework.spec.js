/// <reference types="cypress" />
describe('Login Test', () => {
    // Open website url for each test
    beforeEach(() => {
        cy.visit ("https://cms-lyart.vercel.app/login");
    });

    // TC1. Successful Sign in
    it('Should be able to sign in with correct account and password', () => {
        // Enter email and password
        cy.get('[type="email"]').type('student@admin.com')
        cy.get('[type="password"]').type('111111')
        // Press Sign in
        cy.get('[type="submit"]').click()
        // Assert successful
        cy.url().should('eql', 'https://cms-lyart.vercel.app/dashboard/student')
    });

    // TC2-a. Error when fault email
    it('Should throw error messages when enter wrong emails', () => {
        cy.get('[type="email"]').type('aaaaaa')
        cy.get('[role="alert"]').contains("'email' is not a valid email")
    });

    // TC2-b. When emtpy email and submit
    it('should throw error message when email NOT fill in', () => {
        // Press enter directly
        cy.get('[type="submit"]').click()
        cy.get('[role="alert"]').contains("'email' is required")
    });

    // TC3-a. Error when fault password
    it('should throw error message when only enter wrong password', () => {
        cy.get('[type="email"]').type('student@admin.com')
        // Assert when enter numbers <4 && >16
        cy.get('[type="password"]').then((psw) =>{
            if(psw.text().includes(null)){
                cy.get('[type="password"]').type('11')
                cy.get('[role="alert"]').contains("'password' must be between 4 and 16 characters")
            }else{
                cy.get('[type="password"]').type('12345678901234567')
                cy.get('[role="alert"]').contains("'password' must be between 4 and 16 characters")
            }
        })
    });

    // TC3-b. Error when only empty password
    it('should throw error message when enter correct email and empty password', () => {
        cy.get('[type="email"]').type('student@admin.com')
        cy.get('[type="submit"]').click()
        cy.get('[role="alert"]').contains("'password' is required")
    });

    // TC4. Sign up new account
    it.only('should allow user to sign up new account', () => {
        // Goto Sign up page
        cy.contains('Sign up').click()
        cy.get('[value="student"].ant-radio-input').click()
        cy.get('#signUp_email').type('teststudent@test.com')
        cy.get('#signUp_password').type('testpassword')
        cy.get('#signUp_confirmPassword').type('testpassword')
        cy.get('[type="submit"]').click()
        // Assert signup successful and goto login page
        cy.get('.ant-message-notice-content').should('have.text', 'success')
        cy.url().should('eq', 'https://cms-lyart.vercel.app/login')   
    });
});