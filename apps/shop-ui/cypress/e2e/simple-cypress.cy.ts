context('Demos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/food');
  });

  describe('Left Menu', () => {
    it('Shows the menu when clicked', () => {
      cy.get('.clickable').first().click();
    });

    it('Has 3 options in Testing menu', () => {
      cy.get('.clickable').first().click();
      cy.get('button.mat-raised-button').should('have.length', 3);
    });

    it('Shows render 3 rows', () => {
      cy.contains('Food').click({ force: true });
      cy.get('.mat-row').should('have.length', 3);
    });
  });
});
