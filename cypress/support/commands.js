// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('loginByUI', (username, password) =>{
    cy.visit('https://cms-lyart.vercel.app/login')
    cy.get('[value="manager"]').check({force: true})
    cy.get('#login_email').type(username)
    cy.get('#login_password').type(password)
    cy.get('[type="submit"]').click()
    cy.url().should('contain', '/dashboard/manager')
})

Cypress.Commands.add('loginByAPI', (username, password) =>{
    cy.request({
            method: 'POST',
            url: 'http://cms.chtoma.com/api/login',
            body: {
                "email": "manager@admin.com",
                "password": "U2FsdGVkX1/h+eU4JJ4D2rpaGaiYpHetC/bZzTM0518=",
                "remember": true,
                "role": "manager"
            },
        }).then((res)=> {
            // 写成2xx正则表达式
            expect(res.status).to.eq(201)
            Cypress.env('cms', res.body.data.token)
        })

})
