/// <reference types="cypress" />

describe('API Test Learning 1', () => {
    // TC1 Login Test POST
    it('should login as manager', () => {
        cy.request({
            method: 'POST',
            url: 'http://cms.chtoma.com/api/login',
            body: {
                "email": "manager@admin.com",
                "password": "U2FsdGVkX1/h+eU4JJ4D2rpaGaiYpHetC/bZzTM0518=",
                "remember": true,
                "role": "manager"
            },
        }).its('body')
        .should('contain', {
            "code": 201,
            "msg": "success"
          })
    });

    // TC2 Test GET API
    it('should be able to test GET', () => {
        cy.request({
            method: 'GET',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjQ4NjAzMDA1LCJleHAiOjE2NTYzNzkwMDV9.WCAYbngm68HoYFkLKaWjyRSXDfvGab4kUyH3MKwhhrQ',
            url: 'http://cms.chtoma.com/api/teachers?query=jaime&page=1&limit=3',
            body: {
                'query': 'jaime',
                'page': 1,
                'limit': 3
            },
        }).its('body')
        .should('contain', {
            data: {
                total: 1, 
                teachers: {createdAt: "1977-12-15 12:00:00", updatedAt: "2021-01-09 09:02:26", id: 2, country: "New Zealand"}, 
                paginator: {page: 1, limit: 3}}, 
                code: 200,
                msg: "success"
        })
    });

    it.only('should be able to test GET', () => {
        cy.request({
            method: 'GET',
            url: 'http://cms.chtoma.com/api/teachers/4',
            body: {
                id: "4"
            },
        }).its('body')
        .should('contain', {
            "code": 200,
            "msg": "success"
        })
    });


});
