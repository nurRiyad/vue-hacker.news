
describe("New Stories page", ()=>{

    it("New stories api check", () => {
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
      { statusCode: 200, fixture: "newstories.json" }
    ).as("viewNewStories");
  
    cy.visit("http://localhost:5173/new");
    cy.wait("@viewNewStories");

    cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);

    cy.get('[href="/user/sergei"]').click();
    cy.url().should("be.equal", "http://localhost:5173/user/sergei");
  });
  
});