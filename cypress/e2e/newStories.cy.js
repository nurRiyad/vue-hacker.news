
describe("New Stories page", ()=>{
beforeEach(()=>{
  cy.intercept(
    "GET",
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
    { statusCode: 200, fixture: "newstories.json" }
  ).as("viewNewStories");

  cy.visit("http://localhost:5173/new");
  cy.wait("@viewNewStories");

})
    it("Check number of child", () => {
    
    cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);
    
  });
  
  it("check author section", ()=>{
    cy.get('[href="/user/sergei"]').click();
    cy.url().should("be.equal", "http://localhost:5173/user/sergei");
  })

  it("check comment section", () =>{
    cy.get('[data-testid = "comment"]').eq(4).click();
    cy.url().should("be.equal", "http://localhost:5173/news/44/details");
  })
});