import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Credit, CreditRequestDto} from '../../../models/models';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-credit-transaction',
  templateUrl: './credit-transaction.component.html',
  styleUrls: ['./credit-transaction.component.css']
})
export class CreditTransactionComponent implements OnInit {
  transactions: any[] = [];
  selectedCredit: CreditRequestDto | null = null;
  isSubmittingApproval: boolean = false;
  isSubmittingRefusal: boolean = false;
  creditRequestId = 0

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  //TODO Ovo jos nisu odradili na bekendu
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      console.log(userId)
      this.creditRequestId = userId
      this.accountService.getCreditDetails(userId).subscribe(credit => {
        this.selectedCredit = credit;
      });
    });
  }


  getDayFromDate(dateString: string): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  getMonthFromDate(dateString: string): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  }

  getYearFromDate(dateString: string): number {
    const date = new Date(dateString);
    return date.getFullYear();
  }

  approveCredit(){
    if (this.isSubmittingApproval){
      return;
    }
    this.isSubmittingApproval = true;
    this.accountService.approveCredit(this.creditRequestId, true).subscribe(res => {
      console.log(res)
      this.openErrorSnackBar('Odobrili ste kredit korisniku: ' +  this.selectedCredit!.user!.firstName + " " + this.selectedCredit!.user!.lastName);
      this.router.navigate(['credit-list']);
    }, error => {
      this.openErrorSnackBar('Doslo je do greske!');
      console.log(error)
    },
      () => {
        setTimeout( ()=> {
          this.isSubmittingApproval = false;
        }, 3000);
      })
  }

  declineCredit(){
    if (this.isSubmittingRefusal){
      return;
    }
    this.isSubmittingRefusal = true;
    this.accountService.approveCredit(this.selectedCredit!.creditRequestId, false).subscribe(res => {
      this.openErrorSnackBar('Odbili ste kredit korisniku: ' +  this.selectedCredit!.user!.firstName + " " + this.selectedCredit!.user!.lastName);
      console.log(res)
    }, error => {
      this.openErrorSnackBar('Doslo je do greske!');
      console.log(error)
    },
      () => {
        setTimeout( ()=> {
          this.isSubmittingRefusal = false;
        }, 3000);
      })
  }

  goBack(){
   this.router.navigate(['credit-list'])
  }


  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }

}
