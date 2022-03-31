describe('Test Plugins', () => {
    beforeEach('Login to Dashboard',() => {
        cy.loginByAPI().then(()=>{
            let token = Cypress.env('cms')
            window.localStorage.setItem('cms', JSON.stringify({
                "role": "manager",
                "userId": 3,
                "token": token
            }))
        })
        cy.visit('https://cms-lyart.vercel.app/')
    });

    it('should allow Visual Testing plugin', () => {
        cy.eyesOpen({
            appName: 'Visual Testing Applitools',
            testName: 'Check icon exist',
        })
        cy.eyesCheckWindow({
            tag: "Login Window",
            target: 'window',
            fully: true
        })
        
        cy.get('[width="121"]').eq(0).should('be.visible')
        
        cy.eyesClose()

    });
});