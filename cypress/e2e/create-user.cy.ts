describe('home page test', () => {
  before('open page', () => {
    cy.visit('http://localhost:80');
  });

  it('moving to admin user page - user-list', () => {
    cy.contains('Prijava korisnika');
    // cy.get('a[routerLink="/admin-login"]').click();
    // cy.url().should('include', '/admin-login');
    // cy.contains('Prijava zaposlenog').should('be.visible');
    // cy.get('input.input-box[placeholder="Email"]').type('admin@admin.com');
    // cy.get('input.input-box[placeholder="Password"]').type('admin1234');
    // cy.get('.primary-button').contains('Log in').should('be.enabled').click();
    // cy.get('.primary-button').contains('Dodaj korisnika').should('be.enabled').click();
    // cy.get('input[formControlName="firstName"]').type('Marko');
    // cy.get('input[formControlName="lastName"]').type('Markovic');
    // cy.get('input[formControlName="email"]').type('mmarkovic14521rn@raf.rs');
    //
    // cy.get('input[formControlName="dateOfBirth"]').click({ force: true });
    // // Otvaranje date pickera
    // cy.get('mat-datepicker-toggle').click();
    // cy.get('.mat-calendar-period-button').click();
    // cy.get('.mat-calendar-previous-button').click();
    // cy.get('.mat-calendar-body-cell-content').contains('2001').click();
    // cy.get('.mat-calendar-body-cell-content').contains('APR').click();
    // cy.get('.mat-calendar-body-cell-content').contains('5').click();
    // cy.get('input[formControlName="dateOfBirth"]').should('have.value', '4/5/2001');
    //
    // cy.get('[formControlName="gender"]').click();
    // cy.get('mat-option').contains('Male').click();
    // cy.get('input[formControlName="jmbg"]').type('0405001715487');
    // cy.get('input[formControlName="address"]').type('Bulevar Kralja Aleksandra 352');
    // cy.get('input[formControlName="phoneNumber"]').type('061234567');
    // cy.get('button').contains('Napravi korisnika').click({ force: true});

  });
});
