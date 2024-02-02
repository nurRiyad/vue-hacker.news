describe("Top page of Hacker news site", () => {
 beforeEach(() => {
  cy.intercept(
    "GET",
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    { statusCode: 200, fixture: "topstories.json" }
  ).as("viewTopStories");

  cy.visit("http://localhost:5173/");
  cy.wait("@viewTopStories");
 })
  
  it("Check number of child",() => {

   cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",5);
  
  });
it("Check author section",() =>{
  cy.get('[href="/user/sama"]').click();
  cy.url().should("be.equal", "http://localhost:5173/user/sama");
})

it("check comment section", () =>{
  cy.get('[data-testid = "comment"]').eq(2).click();
  cy.url().should("be.equal", "http://localhost:5173/news/3/details");
})

});
