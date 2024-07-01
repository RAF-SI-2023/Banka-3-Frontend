describe('home page test', () => {
  beforeEach('open page', () => {
    cy.visit('http://localhost:80')
  })

  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });

  // -loguje se firma, kupuje stock, kupuje Future, prodaje Future i Stock

  describe('Prijava kompanije, kupovina i prodaja', () => {
    // beforeEach(() => {
    //   cy.visit('http://localhost:80');
    //   cy.wait(5000); 
    //   cy.reload();
    //   cy.get('a[routerLink="/company-login"]').click();
    //   cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    //   cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    //   cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    //   cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    //   cy.get('app-navbar').should('be.visible');
    // });

    beforeEach(() => {
      cy.visit('http://localhost:80');
      cy.wait(30000); 
      cy.reload();
      cy.get('a[routerLink="/company-login"]').click();
      cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');

      const tryLogin = (attempts) => {
        if (attempts <= 0) throw new Error('Login failed after multiple attempts');
        
        cy.reload();
        cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
        cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
        cy.wait(2000); // wait for 2 seconds to let the page update

        cy.get('body').then(($body) => {
          if ($body.find('input.input-box[placeholder="Password"]').length > 0) {
            cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
            cy.get('.primary-button').contains('Log in').should('be.enabled').click();
            cy.get('app-navbar').should('be.visible');
          } else if ($body.find('.primary-button:contains("Proveri")').length > 0) {
            tryLogin(attempts - 1);
          } else {
            throw new Error('Unexpected state: neither Proveri nor Password field found');
          }
        });
      };

      tryLogin(3); // attempt login 3 times
    });
  
    it('should purchase a stock', () => {
      cy.contains('Berza').click();
      cy.contains('Kupi').first().click();
      cy.contains('Kupovina hartije').should('be.visible');
      cy.get('input[formControlName="allOrNone"]').check();
      cy.get('input.myButtonSecondary').contains('Kupi').click();
      cy.get('.popup-container').should('be.visible');
      cy.contains('Pregled kupovine').should('be.visible');
      cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
  
  
      cy.contains('Berza').click();
      cy.contains('F u t u r e s').click();
      cy.contains('S t o c k s').click();
      cy.contains('F u t u r e s').click();
      cy.wait(80000);
      cy.reload();
      cy.contains('F u t u r e s').click();


      cy.contains('Refresh').click();
      cy.contains('Kupi').first().click();
      cy.contains('Moje hartije').click();
      cy.reload();
      cy.wait(6000);
      cy.reload();


      cy.contains('Berza').click();
      cy.contains('Moje hartije').click();
      cy.contains('Prodaj').last().should('be.visible');
      cy.contains('Prodaj').last().click();
      cy.contains('Prodaja hartije').should('be.visible');
      cy.get('input[formControlName="allOrNone"]').check();
      cy.get('input.myButtonSecondary').contains('Prodaj').click();
      cy.get('.popup-container').should('be.visible');
      cy.contains('Pregled prodaje').should('be.visible');
      cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
    

      cy.contains('M y F u t u r e s').click();
      cy.contains('Prodaj').last().should('be.visible');
      cy.contains('Prodaj').last().click();
  
    });

  });
});
