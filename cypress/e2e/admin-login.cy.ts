describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:4200')
  })
  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');

  });

  it('link prijava zaposlenog is clicked', ()=>{
    cy.get('a[routerLink="/admin-login"]').click();
    cy.url().should('include', '/admin-login');
    cy.contains('Prijava zaposlenog').should('be.visible');
    cy.get('input.input-box[placeholder="Email"]').type('admin@admin.com');
    cy.get('input.input-box[placeholder="Password"]').type('admin1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
  });
});
