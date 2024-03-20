import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  ownerName: string = ''; // Variable for owner name
  accountNumber: string= ''; // Variable for account number
  availableBalance: string = ''; // Variable for available balance
  type: string = ''; // Variable for account type
  accountState: string = ''; // Variable for account state
  reservedFunds: string = ''; // Variable for reserved funds
  selectedCurrency1: string= "EUR";
  selectedCurrency2: string= "USD";
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
  currency1: number = 0;
  currency2: number = 0;
  transactions: any[] = [];


  constructor() {
    this.selectedAccount = this.accounts[0];
    this.updateTransactions() // Selecting the first account
  }

   accounts = [
    { id: '1', ownerName: 'John Doe', accountNumber: '1234567890', availableBalance: 1000, type: 'Savings', accountState: 'Active', reservedFunds: 0,     transactions: [
      { id: '1', date: '2024-03-18', description: 'Payment received', amount: 500, tradeAccount:"11123142142" },
      { id: '2', date: '2024-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
      { id: '3', date: '2024-03-16', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
      { id: '4', date: '2024-03-15', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
    ] },
    { id: '2', ownerName: 'Jane Smith', accountNumber: '0987654321', availableBalance: 500, type: 'Checking', accountState: 'Active', reservedFunds: 0,     transactions: [
      { id: '1', date: '2024-03-21', description: 'Payment received', amount: 500, tradeAccount:"11123142142" },
      { id: '2', date: '2024-03-11', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
      { id: '3', date: '2024-02-21', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
      { id: '4', date: '2024-02-13', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
    ] },
    { id: '3', ownerName: 'Alice Johnson', accountNumber: '1357924680', availableBalance: 1500, type: 'Savings', accountState: 'Active', reservedFunds: 0,     transactions: [
      { id: '1', date: '2024-04-18', description: 'Payment received', amount: 500, tradeAccount:"11123142142" },
      { id: '2', date: '2023-03-17', description: 'Utility bill payment', amount: -100, tradeAccount:"11123142142"  },
      { id: '3', date: '2023-05-16', description: 'Withdrawal', amount: -200, tradeAccount:"11123142142"  },
      { id: '4', date: '2022-03-15', description: 'Deposit', amount: 1000, tradeAccount:"11123142142"  }
    ] }
  ];

  selectedAccount:any;
  // transactions = [
  //   { id: '1', date: '2024-03-18', description: 'Payment received', amount: 500 },
  //   { id: '2', date: '2024-03-17', description: 'Utility bill payment', amount: -100 },
  //   { id: '3', date: '2024-03-16', description: 'Withdrawal', amount: -200 },
  //   { id: '4', date: '2024-03-15', description: 'Deposit', amount: 1000 }
  // ];


   backToMain() {
    const modalWrapper = document.querySelector('.myModalWrapper') as HTMLElement;
    if (modalWrapper) {
        modalWrapper.style.display = 'none';
    } else {
        console.error('Modal wrapper element not found.');
    }
}
getAccounts() {
  // this.accountService.getAccounts().subscribe(accounts => {
  //   this.accounts = accounts;
  //   this.selectedAccount = this.accounts[0]; // Assigning the first account
  //   this.updateTransactions();
  // });
}


nextAccount() {
  const currentIndex = this.accounts.indexOf(this.selectedAccount);
  const nextIndex = (currentIndex + 1) % this.accounts.length;
  this.selectedAccount = this.accounts[nextIndex];
 this.updateTransactions();
}

getDayFromDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getDate();
}

// Method to get the month from the date string (textual representation)
getMonthFromDate(dateString: string): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(dateString);
  return months[date.getMonth()];
}

// Method to get the year from the date string
getYearFromDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}

previousAccount() {
  const currentIndex = this.accounts.indexOf(this.selectedAccount);
  const previousIndex = (currentIndex - 1 + this.accounts.length) % this.accounts.length;
  this.selectedAccount = this.accounts[previousIndex];

 this.updateTransactions();
}


// updateTransactions() {
//   // this.accountService.getTransactions(this.selectedAccount.id).subscribe(transactions => {
//   //   this.transactions = transactions;
//   // });
//   // this.transactions=this.selectedAccount.transactions;
// }

updateTransactions() {
  this.transactions = this.selectedAccount.transactions;
}
displayDetails(){
  const modalWrapper = document.querySelector('.myModalWrapper') as HTMLElement;
  if (modalWrapper) {
      modalWrapper.style.display = 'flex';
  } else {
      console.error('Modal wrapper element not found.');
  }
}

  // Function to refresh the page
  newPayment() {
    window.location.reload();
  }
}
