// describe('home page test', () => {
//   beforeEach('open page', () => {
//     cy.visit('http://localhost:80')
//   })
//
//   it('should display the user login title', () => {
//     cy.contains('Prijava korisnika');
//   });
//
//   // -loguje se firma, kupuje stock, kupuje Future, prodaje Future i Stock
//
//   describe('Prijava kompanije, kupovina i prodaja', () => {
//     // beforeEach(() => {
//     //   cy.visit('http://localhost:100');
//     //   cy.wait(5000);
//     //   cy.reload();
//     //   cy.get('a[routerLink="/company-login"]').click();
//     //   cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
//     //   cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     //   cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
//     //   cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     //   cy.get('app-navbar').should('be.visible');
//     // });
//
//     beforeEach(() => {
//       cy.visit('http://localhost:80');
//       cy.wait(30000);
//       cy.reload();
//       cy.get('a[routerLink="/company-login"]').click();
//       cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
//
//       const tryLogin = (attempts) => {
//         if (attempts <= 0) throw new Error('Login failed after multiple attempts');
//
//         cy.reload();
//         cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
//         cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//         cy.wait(2000); // wait for 2 seconds to let the page update
//
//         cy.get('body').then(($body) => {
//           if ($body.find('input.input-box[placeholder="Password"]').length > 0) {
//             cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
//             cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//             cy.get('app-navbar').should('be.visible');
//           } else if ($body.find('.primary-button:contains("Proveri")').length > 0) {
//             tryLogin(attempts - 1);
//           } else {
//             throw new Error('Unexpected state: neither Proveri nor Password field found');
//           }
//         });
//       };
//
//       tryLogin(3); // attempt login 3 times
//     });
//
//   it('should purchase a stock', () => {
//     cy.contains('Berza').click();
//     cy.contains('Kupi').first().click();
//     cy.contains('Kupovina hartije').should('be.visible');
//     cy.get('input[formControlName="allOrNone"]').check();
//     cy.get('input.myButtonSecondary').contains('Kupi').click();
//     cy.get('.popup-container').should('be.visible');
//     cy.contains('Pregled kupovine').should('be.visible');
//     cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
//     cy.reload();
//     cy.contains('Moje hartije').click();
//     cy.reload();
//     cy.wait(6000);
//     cy.reload();
//     cy.contains('Berza').click();
//     cy.contains('Moje hartije').click();
//     cy.wait(10000);
//     cy.reload();
//     cy.contains('Vidljivost').last().should('be.visible');
//
//     cy.contains('Vidljivost').last().click();
//
//     cy.get('.popup-container').should('be.visible');
//     cy.get('.popup-content input.input').clear().type('1');
//
//     cy.get('.popup-container .myButtonSecondary').contains('Potvrdi').click();
//
//   });
// });
//
//
// describe('Exchange User Tests', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:80');
//     cy.get('a[routerLink="/company-login"]').click();
//   });
//
//   it('should log in as exchange user and perform actions', () => {
//     cy.get('input.input-box[placeholder="Email"]').type('exchange@gmail.com');
//     cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     cy.get('input.input-box[placeholder="Password"]').type('exchange1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     cy.get('app-navbar').should('be.visible');
//     cy.contains('OTC').click();
//     // cy.get('.button').click();
//     cy.get('.button').contains('Kupi').click();
//     cy.get('.popup-container').should('be.visible');
//     cy.get('.popup-content input.input').first().clear().type('1');
//     cy.get('.popup-content input.input').eq(1).clear().type('10000');
//     cy.get('.popup-content input.input').first().should('have.value', '1');
//     cy.get('.popup-content input.input').eq(1).should('have.value', '10000');
//     cy.get('.myButtonSecondary').contains('Potvrdi').click();
//   });
// });
//
// describe('First company accepts Tests', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:80');
//     cy.get('a[routerLink="/company-login"]').click();
//   });
//
//   it('should log in as exchange user and perform actions', () => {
//     cy.get('input.input-box[placeholder="Email"]').type('banak.tri@gmail.com');
//     cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     cy.get('input.input-box[placeholder="Password"]').type('Banka3najbolja');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     cy.get('app-navbar').should('be.visible');
//     cy.contains('OTC').click();
//     cy.get('.panel > :nth-child(3)').click();
//     // cy.get('.cdk-column-Opcije').last().children(':last-child').click();
//     cy.get('.button').contains('Prihvati').click();
//     // cy.get('tbody > tr:last-child > .cdk-column-Opcije > .button').click();
//
//
//
//
//     cy.get('.popup-container').should('be.visible');
//
//     cy.get('.popup-content input.input').clear().type('comment here');
//     cy.get('.myButtonSecondary').contains('Potvrdi').click();
//
//   });
// });
//
//
// describe('Supervisor User Tests', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:80');
//     cy.get('a[routerLink="/admin-login"]').click();
//   });
//
//   it('should log in as supervisor and perform actions', () => {
//     cy.get('input.input-box[placeholder="Email"]').type('jristic@banka.com');
//     cy.get('input.input-box[placeholder="Password"]').type('employee1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     cy.get('app-navbar').should('be.visible');
//     cy.contains('Lista agenata').click();
//     cy.reload();
//     cy.wait(7000);
//     cy.reload();
//     cy.get('.contract-button').click();
//     cy.get('.cdk-column-accept > .icon-button > img').first().click();
//     cy.get('.popup-container').should('be.visible');
//
//     cy.get('.popup-content input.input').clear().type('comment here');
//     cy.get('.myButtonSecondary').contains('Potvrdi').click();
//
//   });
// });
//
//
// describe('First company accepts Tests', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:80');
//     cy.get('a[routerLink="/company-login"]').click();
//   });
//
//   it('should log in as exchange user and perform actions', () => {
//     cy.get('input.input-box[placeholder="Email"]').type('exchange@gmail.com');
//     cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     cy.get('input.input-box[placeholder="Password"]').type('exchange1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     cy.get('app-navbar').should('be.visible');
//     cy.contains('OTC').click();
//     cy.contains('Zahtevi').click();
//     cy.contains('ACCEPTED');
//   });
// });
// });
