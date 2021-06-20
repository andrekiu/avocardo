import { aliasQuery } from "../../utils/graphql-test-utils";

context("Avocardo exercise tests ", () => {
  beforeEach(() => {
    cy.intercept("POST", "api/graphql", (req) => {
      aliasQuery(req, "Index");
    });
  });

  it("should succeed when typing the answer", () => {
    cy.visit("127.0.0.1:3000");
    cy.wait("@gqlIndexQuery")
      .its("response.body.data.getProfile.nextQuiz.answer")
      .then((answer) => {
        cy.get("#challenge");
        cy.get("body").type(` ${answer}{enter}`, { delay: 10 });
      });
    cy.get("#correct");
  });

  it("should succeed when typing an incorrect answer", () => {
    cy.visit("127.0.0.1:3000");
    cy.wait("@gqlIndexQuery")
      .its("response.body.data.getProfile.nextQuiz.answer")
      .then((answer) => {
        cy.get("#challenge");
        cy.get("body").type(` incorrect ${answer} with suffix`, { delay: 10 });
        cy.get("body").type(`{enter}`, { delay: 10 });
      });
    cy.get("#incorrect");
  });

  it("should show a message after clearing all misses", () => {
    cy.visit("127.0.0.1:3000");
    cy.get("#challenge");
    cy.get("body").type(" {enter}");
    cy.get("#incorrect");
    cy.get("body").type("{enter}");
    cy.get("#filter-to-fail").click();
    cy.wait("@gqlIndexQuery")
      .its("response.body.data.getProfile.nextQuiz.answer")
      .then((answer) => {
        cy.get("#challenge");
        cy.get("body").type(`${answer}`, { delay: 10 });
        cy.get("body").type(`{enter}`, { delay: 10 });
        cy.get("#correct");
        cy.get("body").type(`{enter}`, { delay: 10 });
        cy.get("#filter-to-any").click();
        cy.get("#challenge");
        cy.get("#filter-to-any").should("not.exist");
        cy.get("#filter-to-fail").should("not.exist");
      });
  });
});
