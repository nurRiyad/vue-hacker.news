
describe("Hacker News site Test", () => {
 
  
  it("Top stories api check",() => {
    cy.intercept(
      "GET",
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      { statusCode: 200, fixture: "topstories.json" }
    ).as("viewTopStories");


    cy.visit("http://localhost:5173/");
    cy.wait("@viewTopStories");
  

   cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",5);

   cy.get('[href="/user/sama"]').click();
   cy.url().should("be.equal", "http://localhost:5173/user/sama");
    
  });


});
