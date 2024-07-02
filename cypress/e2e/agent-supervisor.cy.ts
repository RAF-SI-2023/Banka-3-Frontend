describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:80')
  })

  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });

  it('prijava agenta', ()=>{
    cy.contains('Prijava zaposlenog').should('be.visible').click();
    cy.wait(30000);
    cy.reload();
    cy.get('input.input-box[placeholder="Email"]').type('mljubinkovic@banka.com');
    cy.get('input.input-box[placeholder="Password"]').type('employee1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();

    cy.contains('Berza').click();
    cy.contains('Kupi').first().click();
    cy.contains('Kupovina hartije').should('be.visible');
    cy.get('input[formControlName="allOrNone"]').check();
    cy.get('input.myButtonSecondary').contains('Kupi').click();
    cy.get('.popup-container').should('be.visible');
    cy.contains('Pregled kupovine').should('be.visible');
    cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();

  });

  it('prijava supervisora', ()=>{
    cy.contains('Prijava zaposlenog').should('be.visible').click();
    cy.get('input.input-box[placeholder="Email"]').type('jristic@banka.com');
    cy.get('input.input-box[placeholder="Password"]').type('employee1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();

    cy.get('.cdk-column-accept > .icon-button > img').first().click();

  });

  it('prijava banke', ()=>{

    cy.get('a[routerLink="/company-login"]').click();
    cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');

    cy.contains('Profit').should('be.visible').click();
    cy.contains('A G E N T').should('be.visible').click();

  });
});
