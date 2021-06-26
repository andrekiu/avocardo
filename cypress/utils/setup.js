export function setup(cy) {
  cy.visit(Cypress.env("server"));
}
