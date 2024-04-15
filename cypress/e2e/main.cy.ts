describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:4200')
  })
  it('open home page', () => {
    cy.contains('Prijava korisnika')
  })
  it('should login', () => {

  });
})
