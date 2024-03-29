import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Credit, CreditRequestDto} from '../models/models';
import { CreditService } from '../services/credit.service';
import { UserService } from '../services/user.service';
import {parseJson} from "@angular/cli/src/utilities/json-file";
@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  credits: CreditRequestDto[] = [];

  constructor(private router: Router, private creditService: CreditService, private userService: UserService) {}

  ngOnInit() {
    this.fetchCredits();
  }

  //TODO Promeni na prave podatke
  fetchCredits() {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.creditService.getAllCredits().subscribe(
      credits => {
        this.credits = credits;
      },
      error => {
        console.error('Error fetching credits:', error);
      }
    );
  }

  sortCredits(sortOption: string) {
    if (sortOption === 'asc') {
      this.credits.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === 'desc') {
      this.credits.sort((a, b) => b.amount - a.amount);
    }
  }

  navigateToCreditDetails(creditId: number) {
    this.router.navigate(['/credit-transaction', creditId]);
  }

  navigateToCreditRequest() {
    this.router.navigate(['/credit-request']);
  }
}
