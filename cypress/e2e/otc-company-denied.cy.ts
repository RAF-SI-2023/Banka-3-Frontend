describe('Home Page Tests', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:80');
  });

  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });
});



describe('Purchase Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80');
    cy.get('a[routerLink="/company-login"]').click();
    cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');
  });
  it('should purchase a stock', () => {
    cy.contains('Hartije').click();
    cy.contains('Kupi').first().click();
    cy.contains('Kupovina hartije').should('be.visible');
    // cy.get('input[formControlName="amount"]').clear().type('5');
    // cy.get('input[formControlName="limit"]').clear().type('100');
    // cy.get('input[formControlName="stop"]').clear().type('50');
    cy.get('input[formControlName="allOrNone"]').check();
    cy.get('input.myButtonSecondary').contains('Kupi').click();
    cy.get('.popup-container').should('be.visible');
    cy.contains('Pregled kupovine').should('be.visible');
    cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
    cy.reload();
    cy.contains('Moje hartije').click();
    cy.reload();
    cy.wait(6000);
    cy.reload();
    cy.contains('Hartije').click();
    cy.contains('Moje hartije').click();
    cy.contains('Vidljivost').first().should('be.visible');

    cy.contains('Vidljivost').first().click();

    cy.get('.popup-container').should('be.visible');
    cy.get('.popup-content input.input').clear().type('1');

    cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();

  });
});

describe('Exchange User Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80');
    cy.get('a[routerLink="/company-login"]').click();
  });

  it('should log in as exchange user and perform actions', () => {
    cy.get('input.input-box[placeholder="Email"]').type('exchange@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('exchange1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');
    cy.contains('OTC').click();
    // cy.get('.button').click();
    cy.get('.button').contains('Kupi').click();
    cy.get('.popup-container').should('be.visible');
    cy.get('.popup-content input.input').first().clear().type('1');
    cy.get('.popup-content input.input').eq(1).clear().type('10000');
    cy.get('.popup-content input.input').first().should('have.value', '1');
    cy.get('.popup-content input.input').eq(1).should('have.value', '10000');
    cy.get('.myButtonSecondary').contains('Potvrdi').click();
  });
});

describe('First company declines Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80')
    cy.get('a[routerLink="/company-login"]').click();
  });

  it('should log in as exchange user and perform actions', () => {
    cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');
    cy.contains('OTC').click();
    cy.get('.panel > :nth-child(3)').click();
    cy.get('.button2').contains('Odbij').click();

    cy.get('.popup-container').should('be.visible');
    cy.get('.popup-content input.input').clear().type('comment here');
    cy.get('.myButtonSecondary').contains('Potvrdi').click();


  });
});


describe('Check if declined', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80');
    cy.get('a[routerLink="/company-login"]').click();
  });

  it('should log in as exchange user and perform actions', () => {
    cy.get('input.input-box[placeholder="Email"]').type('exchange@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('exchange1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');
    cy.contains('OTC').click();
    cy.contains('Zahtevi').click();
    cy.contains('DECLINED');
  });
});

