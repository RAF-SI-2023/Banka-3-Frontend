import {Component, Inject, Input, OnInit} from '@angular/core';
import {TransactionDto} from "../../../models/models";
import {ActivatedRoute, Router} from "@angular/router";
import { parseJson } from '@angular/cli/src/utilities/json-file';

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

    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    if(tk.role === "ROLE_COMPANY"){
      this.router.navigate(['/company-home']);
    }else{
      this.router.navigate(['/']);
    }
  }

}
