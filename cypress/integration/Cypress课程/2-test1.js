// www.chaijs.com, mochajs.org
describe('HomePage', () =>{
    // beforeEach 保证每个TC
    beforeEach (() =>{
        cy.visit("https://cms-lyart.vercel.app/");
    })

    it("should contain logo", () =>{
        cy.get("#logo");
    });

    // 1. 有可能被display none
    // 2. 有可能被opacity：0 透明
    // 3. 有元素挡住改元素
    it('should always display header bar', ()=>{
        cy.scrollTo("bottom");
    // 元素必须是可见的 visibility
        cy.get("#header").should ("be.visible");

    });

    // 判断顶部五个标签可见

});

//
// 1. before  所有的测试用例运行之前
// 2. beforeEach
// 3. after
// 4. afterEach

