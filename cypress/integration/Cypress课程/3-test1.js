/* 
    1. 创建.spec.js 文件？
    2. describe/ contains
    2. attributes
    3. commands.js
    4. 右键copy selector 是不是更容易？
    5. 是不是每次都要get？ 用and
*/

/// <reference types="cypress" />
describe('login', () => {
    beforeEach(() => {
        cy.visit('https://cms-lyart.vercel.app/')
    });

    it('should login', () => {
        cy.get('input[type = text]').type('');
        cy.get('input[type = password]').type('');
        
        cy.get('button').click();
    });
});