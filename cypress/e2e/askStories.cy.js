
describe("Ask stories page", () =>{

  beforeEach(() =>{
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
      { statusCode: 200, fixture: "askstories.json" }
    ).as("viewAskStories");

    cy.visit("http://localhost:5173/ask");
    cy.wait("@viewAskStories");
  })
 it("check number of child",() => {
    
    cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);

  });

  it("Check author section",() =>{
    cy.get(':nth-child(1) > .border-b-2 > .flex-col > .text-xs > [href="/user/pg"]').click();
    cy.url().should('be.equal',"http://localhost:5173/user/pg");

  })

  it("check comment section",() =>{
    cy.get('[data-testid = "comment"]').first().click();
    cy.url().should("be.equal", "http://localhost:5173/ask/1/details");
  })
  
});