
describe("Show stories page", () =>{

  beforeEach(() =>{
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty",
      { statusCode: 200, fixture: "showstories.json" }
    ).as("viewShowStories");

    cy.visit("http://localhost:5173/show");
    cy.wait("@viewShowStories");
  })
    it("check the number of child",() => {
      
       cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);

     });

     it("check comment section",()=>{
      cy.get('[data-testid = "comment"]').eq(3).click();
      cy.url().should("be.equal", "http://localhost:5173/show/26/details");
       
     })

     it("Check author section",()=>{
      cy.get('[href="/user/onebeerdave"]').click();
      cy.url().should("be.equal","http://localhost:5173/user/onebeerdave");
    })
   });