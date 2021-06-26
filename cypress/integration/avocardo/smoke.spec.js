import { setup } from "../../utils/setup";

context("Avocardo smoke tests ", () => {
  beforeEach(() => {
    setup(cy);
    cy.get("#challenge");
    cy.get("body").type(" ");
  });

  it("loads the page without fatals", () => {});

  it("fails when hitting enter after loading", () => {
    cy.get("body").type("{enter}");
    cy.get("#incorrect");
  });

  it("shows next exercise after incorrect page", () => {
    cy.get("body").type("{enter}");
    cy.get("#incorrect");
    cy.get("body").type("{enter}");
    cy.get("#challenge");
    cy.get("#filter-to-fail").should("contain", "1");
  });

  it("shows previous filters after clicking in icon", () => {
    cy.get("body").type("{enter}");
    cy.get("#incorrect");
    cy.get("body").type("{enter}");
    cy.get("#challenge");
    cy.get("#filter-to-fail").should("contain", "1").click();
    cy.get("#challenge");
    cy.get("#filter-to-any");
  });
});
