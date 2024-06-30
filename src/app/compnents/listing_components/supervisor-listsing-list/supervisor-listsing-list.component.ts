import { Component, OnInit } from '@angular/core';
import {MockRequests} from "./mock-requests";
import {Router} from "@angular/router";
import { parseJson } from '@angular/cli/src/utilities/json-file';
import { Actuary, Contract, RequestDto, Stock } from 'src/app/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ExchangeService} from "../../../services/exchange.service";
import { MatDialog } from '@angular/material/dialog';
import { OtcAcceptDeclineComponent } from '../../otc/otc-accept-decline/otc-accept-decline.component';

@Component({
  selector: 'app-supervisor-listsing-list',
  templateUrl: './supervisor-listsing-list.component.html',
  styleUrls: ['./supervisor-listsing-list.component.css'],
})


export class SupervisorListsingListComponent implements OnInit {

  stocksFlag: boolean = true;
  limitFlag: boolean = false;
  contractFlag: boolean = false;
  stocks: Stock[] = [];
  requests = [] as RequestDto[];
  contracts = [] as Contract[];
  actuaries = [] as Actuary[];
  // request: RequestDto = {} as RequestDto;
  requestColumns = ['stockOrderId', 'employeeId', 'ticker','status','type', 'limitValue',
  'stopValue', 'amount','amountLeft','aon'];

  contractColumns = ['contractId', 'ticker', 'userSellerId', 'userBuyerId','companySellerId','companyBuyerId', 'dateCreated', 'price'];

  showRequests = true;
  showLimits = false;
  employeeId: number = 0;


  constructor(private exchangeService: ExchangeService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadAllOrdersToApprove();
    this.loadAgents();
    this.getEmployeeId();
    this.getContracts();
    // this.insertMockActuaries();


  }



  switchToRequests() {
    if(this.stocksFlag) return;
    this.showRequests = true;
    this.showLimits = false;

    this.contractFlag = false;
    this.limitFlag = false;
    this.stocksFlag = true;
  }

  switchToLimits() {
    if(this.limitFlag) return;
    this.limitFlag = true;
    this.contractFlag = false;
    this.stocksFlag = false;

    this.showRequests = false;
    this.showLimits = true;
  }

  switchToContracts() {
    if(this.contractFlag) return;
    this.contractFlag = true;
    this.limitFlag = false;
    this.stocksFlag = false;

    this.showRequests = false;
    this.showLimits = false;
  }

  acceptContract(contract: Contract){

    let obj = {
      contractId: contract.contractId,
      accept: true
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })
  }

  rejectContract(contract: Contract){
    let obj = {
      contractId: contract.contractId,
      accept: false
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })
  }


  setOrderRequestForActuary(id: number, orderRequest: boolean) {
    const actuaryIndex = this.actuaries.findIndex(actuary => actuary.actuaryId === id);
    if (actuaryIndex !== -1) {
      // this.actuaries[actuaryIndex].orderRequest = orderRequest;
      this.exchangeService.setOrderRequest(id, orderRequest).subscribe(
        res => {
          const actuaryIndex = this.actuaries.findIndex(actuary => actuary.actuaryId === id);
          this.actuaries[actuaryIndex].orderRequest = orderRequest;
          console.log('Order request set successfully:', res);
        },
        err => {
          console.error('Error setting order request:', err);
        }
      );
    }
  }

  getContracts(){
    this.exchangeService.getAllSupervisor().subscribe( res => {
      this.contracts = res;
    })
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
        window.location.reload()
      },err=>{
        this.openSnackBar("Greška u prihvatanju zahteva.")
      });
  }

  rejectRequest(elementId: number){
    this.exchangeService.approveStockOrder(elementId, false).subscribe(
      res => {
      this.openSnackBar("Zahtev je odbijen.")
        window.location.reload()
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
      duration: 3000,
    });
  }


  //   insertMockActuaries(): void {
  //   // Mock Actuaries
  //   this.actuaries = [
  //     { actuaryId: 1, employeeId: 101, email: 'actuary1@example.com', role: 'Actuary', limitValue: 1000, limitUsed: 500, orderRequest: true },
  //     { actuaryId: 2, employeeId: 102, email: 'actuary2@example.com', role: 'Actuary', limitValue: 800, limitUsed: 300, orderRequest: false },
  //     { actuaryId: 3, employeeId: 103, email: 'actuary3@example.com', role: 'Actuary', limitValue: 1200, limitUsed: 700, orderRequest: true },
  //   ];
  // }

  // protected readonly MockRequests = MockRequests;

}




