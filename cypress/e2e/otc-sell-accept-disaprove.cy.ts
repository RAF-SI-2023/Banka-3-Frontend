describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:80')
  })
  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });

  it('Bought stock, put it on sale', () => {

    cy.get('input[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.contains('sljubicic7120rn@raf.rs').should('be.visible');
    cy.get('input.input-box[placeholder="Password"]').type('user1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get(':nth-child(13) > a').click();
    cy.get(':nth-child(2) > .cdk-column-opcije > :nth-child(2)').click();
    cy.get('input[formcontrolname="amount"]').clear().type('1');
    cy.get('input[formcontrolname="allOrNone"]').click();
    cy.get('.myButtonSecondary').contains('Kupi').click();
    cy.get('.popup-container').should('be.visible');
    cy.contains('Pregled kupovine').should('be.visible');
    cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
    cy.get(':nth-child(14) > a').click();
    cy.get('.cdk-column-opcije > :nth-child(2)').click();
        cy.get('.popup-content input.input').clear().type('1');
    cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').contains('Uspešna kupovina')


  });


  describe('Sent buy reqeust', () => {
    beforeEach(() => {
      cy.visit('http://localhost:80');
    });
  
    it('should log in as exchange user and perform actions', () => {
      cy.get('input.input-box[placeholder="Email"]').type('jristic3620rn@raf.rs');
      cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
      cy.get('input.input-box[placeholder="Password"]').type('user1234');
      cy.get('.primary-button').contains('Log in').should('be.enabled').click();
      cy.get('app-navbar').should('be.visible');
      cy.get(':nth-child(10) > a').click();
      cy.get('.button').click();
      cy.get('.popup-container').should('be.visible');
      cy.get('.popup-content input.input').first().clear().type('1');
      cy.get('.popup-content input.input').eq(1).clear().type('10000');
      cy.get('.popup-content input.input').first().should('have.value', '1');
      cy.get('.popup-content input.input').eq(1).should('have.value', '10000');
      cy.get('.myButtonSecondary').contains('Potvrdi').click();
    });
  });



  describe('Accepted buy request', () => {
    beforeEach(() => {
      cy.visit('http://localhost:80');
    });
  
    it('should log in as exchange user and perform actions', () => {
      cy.get('input.input-box[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
      cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
      cy.get('input.input-box[placeholder="Password"]').type('user1234');
      cy.get('.primary-button').contains('Log in').should('be.enabled').click();
      cy.get('app-navbar').should('be.visible');
      cy.get(':nth-child(10) > a').click();
      cy.get('.panel > :nth-child(3)').click();
      cy.get('.button').contains('Prihvati').click();
      cy.get('input').type('Komentaar');
      cy.get('.myButtonSecondary').contains('Potvrdi').click();
    });
  });

  describe('Approved sale', () => {
    beforeEach(() => {
      cy.visit('http://localhost:80');
      cy.get('a[routerLink="/admin-login"]').click();

    });
  
    it('Disaprovee as emloyee', () => {
      cy.get('input.input-box[placeholder="Email"]').type('jristic@banka.com');
      cy.get('input.input-box[placeholder="Password"]').type('employee1234');
      cy.get('.primary-button').contains('Log in').should('be.enabled').click();
      cy.get('.contract-button').click();
      cy.get('app-navbar').should('be.visible');
      cy.get('img[src="assets/circle-quarters-svgrepo-com.svg"]').click();
      cy.get('input').type('Komentaar');
      cy.get('.myButtonSecondary').contains('Potvrdi').click();
    });
  });

  
  describe('Check if there is buy', () => {
    beforeEach(() => {
      cy.visit('http://localhost:80');
    });
  
    it('login', () => {
      cy.get('input.input-box[placeholder="Email"]').type('jristic3620rn@raf.rs');
      cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
      cy.get('input.input-box[placeholder="Password"]').type('user1234');
      cy.get('.primary-button').contains('Log in').should('be.enabled').click();
      cy.get('app-navbar').should('be.visible');
      cy.get(':nth-child(10) > a').click();
      !cy.get('.mat-mdc-row > .cdk-column-Hartija');

    });
  });

});