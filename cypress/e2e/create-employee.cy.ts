describe('home page test', () => {
  before('open page', () => {
    cy.visit('http://localhost:80');
  });

  it('moving to admin user page - user-list', () => {
    cy.contains('Prijava korisnika');
    cy.get('a[routerLink="/admin-login"]').click();
    cy.url().should('include', '/admin-login');
    cy.contains('Prijava zaposlenog').should('be.visible');
    cy.get('input.input-box[placeholder="Email"]').type('admin@admin.com');
    cy.get('input.input-box[placeholder="Password"]').type('admin1234');
    cy.get('.primary-button').contains('Log in').should('be.enabled').click();

    cy.get('button.employees-button').contains("Z a p o s l e n i").should('be.visible').click();
    cy.get('button.primary-button2').contains("Dodaj zaposlenog").should('be.visible').click();


    cy.get('input[formControlName="firstName"]').type('Petar');
    cy.get('input[formControlName="lastName"]').type('Petrović');
    cy.get('input[formControlName="username"]').type('petar.petrovic');
    cy.get('input[formControlName="email"]').type('petar.petrovic@raf.rs');

    cy.get('input[formControlName="dateOfBirth"]').click({ force: true });
    cy.get('mat-datepicker-toggle').click();
    cy.get('.mat-calendar-period-button').click();
    cy.get('.mat-calendar-previous-button').click();
    cy.get('.mat-calendar-body-cell-content').contains('1995').click();
    cy.get('.mat-calendar-body-cell-content').contains('JUN').click();
    cy.get('.mat-calendar-body-cell-content').contains('15').click();
    cy.get('input[formControlName="dateOfBirth"]').should('have.value', '6/15/1995');

    cy.get('[formControlName="gender"]').click();
    cy.get('mat-option').contains('Male').click();

    cy.get('input[formControlName="jmbg"]').type('0101990123456');
    cy.get('input[formControlName="address"]').type('Dositejeva 25');
    cy.get('input[formControlName="phoneNumber"]').type('0612345678');
    cy.get('[formControlName="role"]').click();
    cy.get('mat-option').contains('ROLE_ADMIN').click();


    cy.get('button.button-change-password').contains('Napravi korisnika').click();

  });
});
