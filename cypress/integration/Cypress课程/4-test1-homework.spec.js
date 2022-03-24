/// <reference types="cypress" />

import { values } from "cypress/types/lodash";

describe('Add Course Test', () => {
    beforeEach(() => {
        cy.login('manager@admin.com', '111111')
        cy.visit('/dashboard/manager/courses/add-course')
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
        cy.get('.rc-virtual-list-holder-inner').find('[title="Elena Volkman IV"]').click()
        cy.get('.ant-select-selection-item').contains('[title="Elena Volkman IV"]')
    });
        
    // TC4 select multiple items from dynamic list
    it('should allow user to select 3 items in Type', () => {
        cy.get('.ant-select ant-select-focused ant-select-multiple ant-select-show-search').click()
        cy.get('.rc-virtual-list-holder-inner').select('C', 'Python', 'PHP')
        cy.get('.ant-form-item-control-input').should('eq', 'C', 'Python', 'PHP')
    });
        
    // TC5 check disabled field
    it('should not allow user to fillin when field is disabled', () => {
        cy.get('[placeholder="course code"]').should('be.disabled')
    });

    // TC6 select Start Date
    it.only('should allow user to select date in calender', () => {
        const dateNow = new Date()
        
        cy.get('#startTime').click()
        cy.get('[title="2022-03-25"]').click()
        cy.get('[placeholder="Select date"]').its(value)
        // cy.get('#startTime').should((datepicked) =>{
        //     expect(datepicked).to.be.value("2022-03-24")
        //     expect(Date(datepicked).valueOf()).to.be.greaterThan(dateNow.valueOf())
        // })
        // 
    }); 
        
    
});