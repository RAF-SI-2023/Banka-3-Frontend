import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {UserService} from "../../../services/user.service";
import {ExchangeService} from "../../../services/exchange.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OtcBuyPopupComponent} from "../otc-buy-popup/otc-buy-popup.component";
import {Contract, Firm, FutureContract, MyFuture, MyStock, User} from "../../../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {OtcDeclinePopupComponent} from "../otc-decline-popup/otc-decline-popup.component";
import {OtcCompanyBuyPopupComponent} from "../otc-company-buy-popup/otc-company-buy-popup.component";
import { OtcAcceptDeclineComponent } from '../otc-accept-decline/otc-accept-decline.component';

@Component({
  selector: 'app-otc-company-view',
  templateUrl: './otc-company-view.component.html',
  styleUrls: ['./otc-company-view.component.css']
})
export class OtcCompanyViewComponent implements OnInit{

  kupovinaFlag = true;
  tipHartije = "Stock"
  selectedHartija = "Stock"
  zahteviFlag = false;
  ponudeFlag = false;
  user = {} as User
  users: { [userId: number]: User | undefined } = {};
  companies: { [firmId: number]: Firm | undefined } = {};

  stocksData: MyStock[] = [];
  sentData: Contract[] = []
  receivedData: Contract[] = []


  futureData: MyFuture[] = [];
  futureSentData: FutureContract[] = [];
  futureReceivedData: FutureContract[] = [];


  kupovinaColumns: string[] = [ "Hartija", "Kompanija", "Količina", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Cena", "Status"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Cena", "Opcije"];
  futureKupovinaColumns: string[] = [ "Future", "Kompanija", "Veličina", "Jedinica", "Opcije"];
  futureZahteviColumns: string[] = [ "Future", "Broj", "Cena", "Status"];
  futurePonudeColumns: string[] = [ "Future", "Broj", "Cena", "Opcije"];


  constructor(private accountService: AccountService,
              private userService : UserService,
              private exService: ExchangeService,
              private router: Router,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    // getAllPublicStocks();
    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const hasRole = "role" in payload;

    if(hasRole && payload.role === 'ROLE_COMPANY'){
      //SOTCK
      this.exService.getCompanyPublicStocks(payload.id).subscribe( res => {
        this.stocksData = res;
        this.stocksData.forEach(future => {
          this.fetchCompany(future.companyId);
        });
      })
      this.exService.getAllSentRequestsCompany(payload.id).subscribe( res => {
        this.sentData = res;
      })
      this.exService.getAllReceivedRequestsCompany(payload.id).subscribe( res => {
        this.receivedData = res;
      })

      //FUTURE
      this.exService.getCompanyMyFutures(payload.id).subscribe( res => {
        this.futureData = res;
        this.futureData.forEach(future => {
          this.fetchCompany(future.companyId);
        });
      })
      this.exService.getAllSentFutureRequestsCompany(payload.id).subscribe( res => {
        this.futureSentData = res;
      })
      this.exService.getAllReceivedFutureRequestsCompany(payload.id).subscribe( res => {
        this.futureReceivedData = res;
      })
    }
  }

  fetchCompany(companyId: number){
      if (!this.companies[companyId]) {
        this.userService.getCompanyById(companyId).subscribe(res => {
          this.companies[companyId] = res;
        });
    }}

  getAllPublicStocks(): void{
    // this.exService.getPublicStocks().subscribe( res=> {
    //   this.stocksData = res;
    // })
  }

  onStockChange(event: string){
    this.tipHartije = event
  }

  buttonBuy(stock: MyStock) {
    this.dialog.open(OtcBuyPopupComponent, {
      data: { stock: stock}
    });
  }
  buttonBuyFuture(future: MyFuture) {
    this.dialog.open(OtcBuyPopupComponent, {
      data: { future: future}
    });
  }

  acceptOffer(contract: Contract){
    let obj = {
      contractId: contract.contractId,
      accept: true
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })
  }
  declineOffer(contract: Contract){
    let obj = {
      contractId: contract.contractId,
      accept: false
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })

  }

  acceptOfferFuture(contract: FutureContract){
    let obj = {
      contractId: contract.futureContractId,
      accept: true
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })
  }
  declineOfferFuture(contract: FutureContract){
    let obj = {
      contractId: contract.futureContractId,
      accept: false
    }
    this.dialog.open(OtcAcceptDeclineComponent,{
      data: { data: obj }
    })

  }

  switchToKupovina(){
    if(this.kupovinaFlag) return;
    this.kupovinaFlag = !this.kupovinaFlag;
    this.zahteviFlag = false;
    this.ponudeFlag = false;
    // this.userService.getAllUsers().subscribe( res=> {
    //   this.users = res;
    // })
  }

  switchToZahtevi(){
    if(this.zahteviFlag) return;
    this.kupovinaFlag = false;
    this.zahteviFlag = !this.zahteviFlag;
    this.ponudeFlag = false;
  }

  switchToPonude(){
    if(this.ponudeFlag) return;
    this.kupovinaFlag = false;
    this.zahteviFlag = false;
    this.ponudeFlag = !this.ponudeFlag;
  }

  mockData(): void{

    // this.stocksData = [
    //   {
    //     "stock": "Tesla Inc.",
    //     "user": "alice_smith",
    //     "amount": 8,
    //     "price": 900.00,
    //     "status": "ACCEPTED"
    //   },
    //   {
    //     "stock": "Amazon.com Inc.",
    //     "user": "bob_johnson",
    //     "amount": 15,
    //     "price": 3300.25,
    //     "status": "ACCEPTED"
    //   },
    //   {
    //     "stock": "Meta Platforms Inc.",
    //     "user": "emma_wilson",
    //     "amount": 20,
    //     "price": 340.75,
    //     "status": "DECLINED"
    //   },
    //   {
    //     "stock": "Netflix Inc.",
    //     "user": "chris_miller",
    //     "amount": 12,
    //     "price": 550.25,
    //     "status": "PROCESSING"
    //   },
    // ];
  }


}
