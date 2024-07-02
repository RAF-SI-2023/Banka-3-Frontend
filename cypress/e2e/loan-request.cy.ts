// describe('Korisnik podnosi zahtev za kredit', () => {
//   let accountNumber = '';
//   let initialBalance = '';
//
//   beforeEach('open page', () => {
//     cy.visit('http://localhost:80');
//     cy.wait(2000);
//   });
//
//   it('should display the user login title', () => {
//     cy.contains('Prijava korisnika');
//   });
//
//   it('should login as user, get account number with RSD currency, and submit a loan request', () => {
//     cy.contains('Prijava korisnika').click();
//     cy.get('input.input-box[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
//     cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     cy.get('input.input-box[placeholder="Password"]').type('user1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//     cy.get('app-navbar').should('be.visible');
//
//     // Dobijanje broja računa sa RSD valutom
//     function getAccountWithRSD() {
//       cy.get('.accountCard').then($accountCard => {
//         const currencyMark = $accountCard.find('.cardInfoWrapper .h4.blueText').last().text().trim();
//         if (currencyMark.includes('RSD')) {
//           accountNumber = $accountCard.find('.cardInfoWrapper .h4.blueText').first().text().trim();
//           initialBalance = $accountCard.find('.cardInfoWrapper .h4.blueText').eq(1).text().replace(' RSD', '').replace(',', '').trim();
//           cy.log('Account Number:', accountNumber);
//           cy.log('Initial Balance:', initialBalance);
//         } else {
//           cy.get('.arrowWrapper').last().click();
//           cy.wait(1000); // Čekanje da se učita sledeći račun
//           getAccountWithRSD();
//         }
//       });
//     }
//
//     getAccountWithRSD();
//
//     cy.contains('Krediti').click();
//     cy.url().should('include', '/credit-list-user');
//     cy.contains('Novi zahtev za kredit').click();
//     cy.url().should('include', '/credit-request');
//
//     // Popunjavanje forme za zahtev za kredit
//     cy.get('select[formControlName="name"]').select('Gotovinski');
//     cy.get('select[formControlName="accountNumber"]').then($select => {
//       const option = $select.find(`option[value="${accountNumber}"]`);
//       cy.wrap(option).should('exist').then(() => {
//         cy.get('select[formControlName="accountNumber"]').select(accountNumber);
//       });
//     });
//     cy.get('input[formControlName="amount"]').type('350000');
//     cy.get('input[formControlName="dateOfEmployment"]').type('2020-01-01');
//     cy.get('textarea[formControlName="applianceReason"]').type('Kupovina automobila');
//     cy.get('select[formControlName="paymentPeriod"]').select('12');
//     cy.get('input[type="checkbox"][formControlName="employed"]').check();
//     cy.get('input[type="submit"]').contains('Pošalji zahtev').click();
//
//     cy.contains('Uspesno poslat zahtev za kredit').should('be.visible');
//   });
//
//   it('should login as admin and approve the loan', () => {
//     cy.visit('http://localhost:80');
//     cy.get('a[routerLink="/admin-login"]').click();
//     cy.get('input.input-box[placeholder="Email"]').type('admin@admin.com');
//     cy.get('input.input-box[placeholder="Password"]').type('admin1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//
//     cy.wait(4000);
//     cy.contains('Zahtevi za kredit').click();
//     cy.url().should('include', '/credit-list');
//
//     // Provera računa sa kog je poslat zahtev i statusa "PROCESSING"
//     cy.get('.transactionsWrapper').contains(accountNumber).should('be.visible');
//     cy.get('.transactionsWrapper').contains('PROCESSING').should('be.visible');
//
//     cy.get('.transactionsWrapper').last().contains('Detalji transakcija').click();
//     cy.url().should('include', '/credit-transaction');
//     cy.contains('Odobri kredit').click();
//     cy.contains('Odobrili ste kredit korisniku').should('be.visible');
//   });
//
//   it('should check if the funds are credited', () => {
//     cy.wait(8000);
//     cy.visit('http://localhost:80');
//     cy.contains('Prijava korisnika').click();
//     cy.get('input.input-box[placeholder="Email"]').type('sljubicic7120rn@raf.rs');
//     cy.get('.primary-button').contains('Proveri').should('be.enabled').click();
//     cy.get('input.input-box[placeholder="Password"]').type('user1234');
//     cy.get('.primary-button').contains('Log in').should('be.enabled').click();
//
//     cy.wait(10000);
//
//     cy.contains('Pregled računa').should('be.visible');
//
//
//     function findAccount() {
//       cy.get('.accountCard .h4.blueText').first().then(($accNum) => {
//         if ($accNum.text().trim() !== accountNumber) {
//           cy.get('.arrowWrapper').last().click();
//           cy.wait(1000);
//           findAccount();
//         } else {
//           const expectedBalance = (parseFloat(initialBalance) + 350000).toFixed(2);
//           cy.log('Expected Balance:', expectedBalance);
//           cy.get('.accountCard .h4.blueText').eq(1).invoke('text').then(text => {
//             const actualBalance = parseFloat(text.trim().replace(' RSD', '').replace(',', ''));
//             cy.log('Actual Balance:', actualBalance.toFixed(2));
//             cy.wrap(actualBalance.toFixed(2)).should('eq', expectedBalance);
//           });
//         }
//       });
//     }
//
//     findAccount();
//   });
// });
