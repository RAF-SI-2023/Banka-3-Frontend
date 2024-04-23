import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MatSnackBar } from '@angular/material/snack-bar';
import {AccountService} from "../../../services/account.service"; // Importujemo MatSnackBar


@Component({
  selector: 'app-bankomat-view-card',
  templateUrl: './bankomat-view-card.component.html',
  styleUrls: ['./bankomat-view-card.component.css']
})
export class BankomatViewCardComponent {
  cardNumber: string = '';
  cvc: string = '';
  isButtonDisabled: boolean = true;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  validateInputs(): boolean {
    const cardNumberRegex = /^[0-9]{8}$/;
    const cvcRegex = /^[0-9]{3}$/;
    return cardNumberRegex.test(this.cardNumber) && cvcRegex.test(this.cvc);
  }

  onInputChange(): void {
    this.isButtonDisabled = !this.validateInputs();
    }

  onContinue(): void {
    const userId = 1;
    if (!this.validateInputs()) {
      this.showSnackbar('Invalid input. Please check your card number and CVC.');
      return; // Stop further execution
    }
    this.accountService.loginCard(userId, this.cardNumber, this.cvc)
      .subscribe(response => {
        if (response.status === 200) {
          this.router.navigate(['/bankomat'], { queryParams: { accountNumber: this.cardNumber } });
        } else {
          this.showSnackbar('Failed to login. Please try again later.');
        }
      });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // Position the snackbar
      verticalPosition: 'bottom'
    });
  }
}
