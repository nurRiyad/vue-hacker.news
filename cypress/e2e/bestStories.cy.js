

describe("Best stories page", () =>{
    
    it("Best stories api check", () =>{
    cy.intercept(
      "GET" ,
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
      { statusCode: 200, fixture: "beststories.json"}
      ).as("viewBestStories");

      cy.visit("http://localhost:5173/best");
      cy.wait("@viewBestStories");
  
      cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",7);

      cy.get(':nth-child(2) > .border-b-2 > .flex-col > .flex.text-xs > [href="/user/phyllis"]').click();
      cy.url().should('be.equal',"http://localhost:5173/user/phyllis");
      

    });

})