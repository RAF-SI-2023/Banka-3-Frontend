import { Component } from '@angular/core';
import {MockRequests} from "./mock-requests";
import {Router} from "@angular/router";
import {ExchangeService} from "../../services/exchange.service";


@Component({
  selector: 'app-supervisor-listsing-list',
  templateUrl: './supervisor-listsing-list.component.html',
  styleUrls: ['./supervisor-listsing-list.component.css'],
})
/*
Izlistavanje hartija koje je podneo zahtev agent... treba da ima dugme da odbije i prihvati
 */
export class SupervisorListsingListComponent {
  requests: Request[] = [];
  requestColumns = ['stockOrderId', 'employeeId', 'ticker','status','type', 'limitValue', 'stopValue', 'amount','amountLeft','aon', 'margine'];
  constructor(private exchangeService: ExchangeService, private router: Router) {
  }
  ngOnInit() {
    this.exchangeService.getAllOrdersToApprove().subscribe( res => {
      this.requests = res;
    }, error => {
      console.log(error)
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

  protected readonly MockRequests = MockRequests;
}

