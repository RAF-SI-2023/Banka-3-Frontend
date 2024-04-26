describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:80')
  })
  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });

  it('should allow a user to check email address', () => {

    cy.get('input[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.contains('sljubicic7120rn@raf.rs').should('be.visible');
    cy.get('input.input-box[placeholder="Password"]').type('user1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
  });
});
