import { setup } from "../../utils/setup";

context("Avocardo feedback tests ", () => {
  beforeEach(() => setup(cy));
  it("should display a button to skip question", () => {
    cy.get("#challenge");
    cy.get("#skip-question");
  });

  it("should display a form after pressing skip button", () => {
    cy.get("#challenge");
    cy.get("#skip-question").click();
    cy.get("#feedback");
  });

  it("should go back to the challenge after pressing back", () => {
    cy.get("#challenge");
    cy.get("#skip-question").click();
    cy.get("#feedback");
    cy.get("#back").click();
    cy.get("#challenge");
  });

  it("should show a new challenge after selecting an option and pressing continue", () => {
    cy.get("#challenge");
    cy.get("#skip-question").click();
    cy.get("#feedback");
    cy.get("#feedback-options li input").click({ multiple: true });
    cy.get("#continue").click();
    cy.get("#challenge");
  });
});
