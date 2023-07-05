context('Simple e2e tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  });

  describe('Left Menu', () => {
    it('Shows the menu when clicked', () => {
      cy.get('.menu').first().click();
    });

    it('Has 4 links in the horizontal menu', () => {
      cy.get('.navLink').should('have.length', 3);
    });

    it('Shows render 3 rows', () => {      
      cy.get('.mat-row').should('have.length', 3);
    });
  });
});