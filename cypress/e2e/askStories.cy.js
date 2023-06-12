
describe("Ask stories page", () =>{
 it("Ask stories api check",() => {
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty",
      { statusCode: 200, fixture: "askstories.json" }
    ).as("viewAskStories");

    cy.visit("http://localhost:5173/ask");
    cy.wait("@viewAskStories");
   
    cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);

    
    cy.get(':nth-child(1) > .border-b-2 > .flex-col > .text-xs > [href="/user/pg"]').click();
    cy.url().should('be.equal',"http://localhost:5173/user/pg");

  });
  
});