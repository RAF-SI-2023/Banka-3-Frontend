describe('Korisnik menja valutu i obavlja transakcije na berzi', () => {
  let accountNumber = '3213213213213213';
  let initialBalance = '';
  let stockQuantity = '';
  let initialEurValue = ''

  beforeEach('open page', () => {
    cy.visit('http://localhost:80');
    cy.wait(2000);
  });

  it('should display the user login title', () => {
    cy.contains('Prijava korisnika');
  });

  it('should login as company and check the initial profit for EUR', () => {
    // Logovanje kao kompanija
    cy.contains('Prijava kompanije').click();
    cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');

    // Navigacija do "Profit"
    cy.contains('Profit').click();
    cy.url().should('include', '/profit');

    // Pamtim vrednosti EUR
    cy.get('.rowCommission').within(() => {
      cy.get('.kolona').contains('EUR').parent().invoke('text').then(text => {
        initialEurValue = text.trim().split(' ')[0];
        cy.log('Initial EUR Value:', initialEurValue);
      });
    });
  });

  it('should perform currency exchange and check the balance', () => {

    cy.contains('Prijava korisnika').click();
    cy.get('input.input-box[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('user1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');

    cy.contains('Menjačnica').click();
    cy.url().should('include', '/exchange');

    cy.get('select[formControlName="selectedAccount1"]').select('3213213213213213');
    cy.get('select[formControlName="selectedAccount2"]').select('2222222222222222');
    cy.get('input[formControlName="amount"]').type('100');

    cy.get('input[type="submit"]').contains('Izvrši konverziju').click();
    cy.contains('Uspesno ste').should('be.visible');

    cy.visit('http://localhost:80');

    cy.contains('Berza').click();
    cy.url().should('include', '/listing-list');

    cy.get('.table').then($table => {
      cy.log('Tabela pronađena:', $table.length > 0);
    });

    cy.get('.table').contains('Kupi').first().click();
    cy.url().should('include', '/buy-hartije');

    // Popunjavanje forme za kupovinu hartija
    cy.get('input[formControlName="amount"]').type('0')
    cy.get('input[type="checkbox"][formControlName="allOrNone"]').check();
    cy.get('input[type="submit"]').contains('Kupi').click();
    cy.contains('Potvrdi').click()
    // cy.contains('Uspesna').should('be.visible');

    cy.wait(6000);
    cy.contains('Moje hartije').click();
    cy.url().should('include', '/my-listings');

    cy.get('.table mat-row').first().within(() => {
      cy.get('mat-cell').eq(1).invoke('text').then(text => {
        stockQuantity = text.trim();
        cy.log('Stock Quantity:', stockQuantity);
      });
      cy.contains('Prodaj').click();
    });
    // Popunjavanje forme za prodaju hartija
    cy.url().should('include', '/sell-hartije');
    cy.get('input[formControlName="amount"]').clear().type('5');
    cy.get('input[type="checkbox"][formControlName="allOrNone"]').check();
    cy.get('input[type="submit"]').contains('Prodaj').click();
    cy.contains('Potvrdi').click();
    //cy.contains('Uspesna prodaja').should('be.visible');
    cy.wait(7000);

    cy.contains('Vidljivost').click();

    cy.get('.popup-container').should('be.visible');
    cy.get('.popup-container input[type="number"][name="publicAmount"]').clear().type('3');
    cy.get('.popup-container button').contains('Potvrdi').click();


  });
  it('should login as company again and check the updated profit for EUR', () => {
    cy.contains('Prijava kompanije').click();
    cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
    cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
    cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    cy.get('app-navbar').should('be.visible');

    cy.contains('Profit').click();
    cy.url().should('include', '/profit');

    // Provera da li EUR nije 0 i nije isto kao inicijalna vrednost
    cy.get('.rowCommission').within(() => {
      cy.get('.kolona').contains('EUR').parent().invoke('text').then(text => {
        const updatedEurValue = text.trim().split(' ')[0];
        cy.log('Updated EUR Value:', updatedEurValue);
        cy.wrap(parseFloat(updatedEurValue)).should('not.equal', parseFloat(initialEurValue));
        cy.wrap(parseFloat(updatedEurValue)).should('not.equal', 0);
      });
    });
  });
});
