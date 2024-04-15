import { Component, OnInit } from '@angular/core';
import {MockRequests} from "./mock-requests";
import {Router} from "@angular/router";
import {ExchangeService} from "../../services/exchange.service";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Actuary, RequestDto, Stock } from 'src/app/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-supervisor-listsing-list',
  templateUrl: './supervisor-listsing-list.component.html',
  styleUrls: ['./supervisor-listsing-list.component.css'],
})


export class SupervisorListsingListComponent implements OnInit {

  stocksFlag: boolean = true;
  limitFlag: boolean = false;
  stocks: Stock[] = [];
  requests = [] as RequestDto[];
  actuaries = [] as Actuary[];
  // request: RequestDto = {} as RequestDto;
  requestColumns = ['stockOrderId', 'employeeId', 'ticker','status','type', 'limitValue',
  'stopValue', 'amount','amountLeft','aon', 'margine'];
  showRequests = true;
  showLimits = false;
  employeeId: number = 0;


  constructor(private exchangeService: ExchangeService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.loadAllOrdersToApprove();
    this.loadAgents();
    this.getEmployeeId();
  }


  switchToRequests() {
    this.showRequests = true;
    this.showLimits = false;

    this.limitFlag = false;
    if(this.stocksFlag) return;
    this.stocksFlag = true;
  }

  switchToLimits() {
    if(this.limitFlag) return;
    this.limitFlag = true;
    this.stocksFlag = false;

    this.showRequests = false;
    this.showLimits = true;
  }

  getEmployeeId(){
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.employeeId = tk.id;
  }

  loadAllStocks() {
    this.exchangeService.getAllStocks().subscribe(
      (stocksData) => {
        this.stocks = stocksData;
      },
      (error) => {
        console.error('Error fetching stocks', error);
      }
    );
  }

  loadAgents() {
    this.exchangeService.getAllAgents().subscribe(
      (ordersData) => {
        this.actuaries = ordersData;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadAllOrdersToApprove() {
    this.exchangeService.getAllOrdersToApprove().subscribe(
      (ordersData) => {
        this.requests = ordersData;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  acceptRequest(elementId: number){
    this.exchangeService.approveStockOrder(elementId, true).subscribe( 
      res => {
        this.openSnackBar("Zahtev je prihvaćen.")
      },err=>{
        this.openSnackBar("Greška u prihvatanju zahteva.")
      });
  }
  
  rejectRequest(elementId: number){
    this.exchangeService.approveStockOrder(elementId, false).subscribe( 
      res => {
      this.openSnackBar("Zahtev je odbijen.")
    },err=>{
      this.openSnackBar("Greška u odbijanju zahteva.")
    });
  }

  setUserLimit(id: number, limitValue: number): void {
     this.exchangeService.setLimit(id, limitValue).subscribe( 
      res => {
        const updatedActuaryIndex = this.actuaries.findIndex(actuary => actuary.actuaryId === id);
        if (updatedActuaryIndex !== -1) {
          this.actuaries[updatedActuaryIndex].limitValue = res.limitValue;
        }
      this.openSnackBar("Limit je postavljen.")
    },err=>{
      this.openSnackBar("Greška u postavljanju limita.")
    });
  }

  resetUserLimit(id: number): void {
    this.exchangeService.resetLimitUsed(id).subscribe( 
      res => {
      this.openSnackBar("Limit je resetovan.")
    },err=>{
      this.openSnackBar("Greška u resetovanju limita.")
    });
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 2000, 
    });
  }

  // protected readonly MockRequests = MockRequests;

}




