
describe("Job stories page", () =>{

  beforeEach(() =>{
    cy.intercept(
      "GET",
     "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty",
      { statusCode: 200, fixture: "jobstories.json" }
    ).as("viewJobStories");

    cy.visit("http://localhost:5173/jobs");
    cy.wait("@viewJobStories");
   
  })
    it("Check number of stories",() => {
       
       cy.get(".flex.flex-col.bg-white.h-full.w-full").children().should("have.length",7);

     });

     it("Check author section",() =>{
      cy.get(':nth-child(1) > .border-b-2 > .flex-col > .flex.text-xs > a').click();
       cy.url().should('be.equal',"http://localhost:5173/user/phyllis");
     })
   });