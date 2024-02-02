describe("Best stories page", () =>{

  beforeEach(()=>{
    cy.intercept(
      "GET" ,
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty",
      { statusCode: 200, fixture: "beststories.json"}
      ).as("viewBestStories");

      cy.visit("http://localhost:5173/best");
      cy.wait("@viewBestStories");
  })
    
    it("Check number of child", () => {

      cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",7);
    });

    it("check author section", () => {
      cy.get(':nth-child(2) > .border-b-2 > .flex-col > .flex.text-xs > [href="/user/phyllis"]').click();
      cy.url().should('be.equal',"http://localhost:5173/user/phyllis");
      
    })

    it("check comment section",()=>{
      cy.get('[data-testid = "comment"]').eq(3).click();
      cy.url().should("be.equal", "http://localhost:5173/news/4/details");
       
     })

})