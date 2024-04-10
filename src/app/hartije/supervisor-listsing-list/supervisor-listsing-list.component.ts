import { Component, OnInit } from '@angular/core';
import {MockRequests} from "./mock-requests";
import {Router} from "@angular/router";
import {ExchangeService} from "../../services/exchange.service";
import { Request, Stock } from "../../models/models"; // Uzimamo Request i Stock iz istog models.ts fajla
import { parseJson } from '@angular/cli/src/utilities/json-file';

@Component({
  selector: 'app-supervisor-listsing-list',
  templateUrl: './supervisor-listsing-list.component.html',
  styleUrls: ['./supervisor-listsing-list.component.css'],
})
/*
Izlistavanje hartija koje je podneo zahtev agent... treba da ima dugme da odbije i prihvati
 */
export class SupervisorListsingListComponent implements OnInit {

  stocks: Stock[] = [];
  requests: Request[] = [];
  request: Request = {} as Request;
  requestColumns = ['stockOrderId', 'employeeId', 'ticker','status','type', 'limitValue',
  'stopValue', 'amount','amountLeft','aon', 'margine'];
  showRequests = true;
  showLimits = false;
  employeeId: number = 0;


  constructor(private exchangeService: ExchangeService, private router: Router) {

  }

  switchToRequests() {
    this.showRequests = true;
    this.showLimits = false;
  }

  switchToLimits() {
    this.showRequests = false;
    this.showLimits = true;
  }

  ngOnInit() {
    this.loadAllStocks();
    this.loadAllOrdersToApprove();
    this.getEmployeeId();
  }

  getEmployeeId(){
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.request.employeeId = tk.id;
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

  loadAllOrdersToApprove() {
    this.exchangeService.getAllOrdersToApprove().subscribe(
      (ordersData) => {
      //todo nisa, sigurna sta je order
        //this.? = ordersData;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  acceptRequest(elementId: number){
    this.exchangeService.approveStockOrder(elementId, true).subscribe( res => {
      this.ngOnInit();
      //treba da se doda neko obavestenje da je zahtev prihvacen
    }
    );
  }
  rejectRequest(elementId: number){
    this.exchangeService.approveStockOrder(elementId, false).subscribe( res => {
      this.ngOnInit();
      //treba da se doda neko obavestenje da je zahtev odbijen
    }
    );
  }

  setUserLimit(id: number, limitValue: number): void {


    this.MockRequests[id-1].limitValue = limitValue;


    //todo nisam sigurna koji id je u pitanju id sa rute ili id sa liste
     this.exchangeService.setLimit(id, limitValue);
  }

resetUserLimit(id: number): void {


  this.exchangeService.resetLimitUsed(id);
}

  protected readonly MockRequests = MockRequests;

}


