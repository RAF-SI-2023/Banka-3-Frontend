import {Component, Inject, Input, OnInit} from '@angular/core';
import {TransactionDto} from "../../../models/models";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  transaction = {} as TransactionDto

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['transaction']) {
        this.transaction = JSON.parse(params['transaction']);
        console.log(this.transaction)
      }
    });
  }



  goBack(){
    this.router.navigate(['']);
  }

}
