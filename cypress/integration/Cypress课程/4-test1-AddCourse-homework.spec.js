/// <reference types="cypress" />

/* 
浮动菜单 去source 按暂停 再回element 选取
http的方法，get，post，put，
http请求码
npm crypto-js
    https://github.com/chtocode/CMS
    http://cms.chtoma.com/swagger/#/
    AES password
    local storage方法
    localStorage.setItem('asdf', JSON({adsfsda}))
    custom Commands
*/

describe('Add Course Test', () => {
    beforeEach('Login with token',() => {
        cy.loginByAPI().then(()=>{
            let token = Cypress.env('cms')
            window.localStorage.setItem('cms', JSON.stringify({
                "role": "manager",
                "userId": 3,
                "token": token
            }))
        })
        cy.visit('https://cms-lyart.vercel.app/dashboard/manager')
        cy.get('[role="button"]').eq(2).click()
        cy.get('[title="Add Course"]').click()
    });

    // TC1 test alert messages when submit blank
    it('should display alert messages of fill-in request when leave mandatory field blank and submit "Create Corse"', () => {
        cy.get('[type="submit"]').contains('Create Course').click()
        // Check all alert message
        cy.contains("'name' is required").should('be.visible')
        cy.contains("'teacherId' is required").should('be.visible')
        cy.contains("'type' is required").should('be.visible')
        cy.contains("'price' is required").should('be.visible')
        cy.contains("'maxStudents' is required").should('be.visible')
        cy.contains("'duration' is required").should('be.visible')
        cy.contains("Duration must be greater than 0!").should('be.visible')
        cy.contains("'detail' is required").should('be.visible')
    });

    // TC2 fill in Course Name
    it('should allow user to type in Course Name', () => {
        cy.get('[placeholder="course name"]').type('Test Course')
    })

    // TC3 select from dynamic list
    it('should allow user to select item when dropdown list is hidden', () => {
        cy.get('#teacherId').type('ele')
        // locate virtual list
        // cy.get('div[class^="rc"]').should('be.visible') 
        // cy.get('div[class^=rc] div div[class^=ant]')
        cy.get('div.rc-virtual-list-holder > div > div> div').each((element)=>{
            if (element.text() == 'Helene Veum') {
                cy.wrap(element).click({force: true})
            }
        })
    });
        
    // TC4 select multiple items from dynamic list
    it('should allow multiple select in Type', () => {
        cy.get('div[class*="multiple"] div[class$="selector"]').click()
        cy.get('.rc-virtual-list-holder >div >div> div').each((element)=>{
            if (element.text() == 'C') {
                cy.wrap(element).click()
            }else if(element.text() == 'C#'){
                cy.wrap(element).click()
            }
        })
    });
        
    // TC5 check disabled field
    it('should not allow user to fillin when field is disabled', () => {
        cy.get('[placeholder="course code"]').should('be.disabled')
    });

    // TC6 select Start Date
    it('should allow user to select date in calender', () => {
        const dateNow = new Date()
        
        cy.get('#startTime').click()
        cy.get('td[class*="disabled"]').each((element)=>{
            cy.get(element).click({force: true})
            cy.get('#startTime').should('have.text', '')
        })
        // cy.get('[title="2022-03-25"]').click()
        // cy.get('[placeholder="Select date"]').its(value)
        // cy.get('#startTime').should((datepicked) =>{
        //     expect(datepicked).to.be.value("2022-03-24")
        //     expect(Date(datepicked).valueOf()).to.be.greaterThan(dateNow.valueOf())
        // })
        // 
    }); 

    // TC7 Test Price
    it('should >=0 when fillin Price', () => {
        cy.get('#price').type('-9{downArrow}')
        cy.get('#price').should('have.value', '$ 0')
    });
    
    // TC8 Test Student Limit
    it('should <=10 when fillin Student number', () => {
        cy.get('#maxStudents').type('12{upArrow}')
        cy.get('#maxStudents').should('have.value', '10')
    });

    // TC9 Test Duration
    it('should >=1 when fillin Duration', () => {
        cy.get('[role="spinbutton"]').eq(2).type('0')
        cy.get('[role="alert"]').should('have.text', 'Duration must be greater than 0!')
    });

    // TC10 Test Description
    it('should >=100 words when fillin Description', () => {
        for(var detailArray = 0; detailArray <99; detailArray ++){
            var dtText = cy.wrap(detailArray)
        }
        cy.get('#detail').type(dtText.toString())
        cy.get('[role="alert"]').should('have.text', 'Description length must between 100 - 1000 characters.')
    });

    // TC11 Test Cover attachment
    it('should attach picture in Cover', () => {
        cy.get('span.ant-upload').should('have.text', 'Click or drag file to this area to upload')
        cy.get('[type="file"]').attachFile('testImage.png')
        cy.get('.ant-modal-footer >.ant-btn-primary').click()
    });
});