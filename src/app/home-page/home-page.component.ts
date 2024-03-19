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

   backToMain() {
    const modalWrapper = document.querySelector('.myModalWrapper') as HTMLElement;
    if (modalWrapper) {
        modalWrapper.style.display = 'none';
    } else {
        console.error('Modal wrapper element not found.');
    }
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
