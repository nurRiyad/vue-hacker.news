
describe("Show stories page", () =>{
    it("Show stories api check",() => {
       cy.intercept(
         "GET",
         "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty",
         { statusCode: 200, fixture: "showstories.json" }
       ).as("viewShowStories");
   
       cy.visit("http://localhost:5173/show");
       cy.wait("@viewShowStories");
      
       cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",6);

       cy.get('[href="/user/onebeerdave"]').click();
       cy.url().should("be.equal","http://localhost:5173/user/onebeerdave")
     });
   });