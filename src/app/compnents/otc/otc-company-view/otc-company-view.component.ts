import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {UserService} from "../../../services/user.service";
import {ExchangeService} from "../../../services/exchange.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OtcBuyPopupComponent} from "../otc-buy-popup/otc-buy-popup.component";
import {Contract} from "../../../models/models";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {OtcDeclinePopupComponent} from "../otc-decline-popup/otc-decline-popup.component";
import {OtcCompanyBuyPopupComponent} from "../otc-company-buy-popup/otc-company-buy-popup.component";

@Component({
  selector: 'app-otc-company-view',
  templateUrl: './otc-company-view.component.html',
  styleUrls: ['./otc-company-view.component.css']
})
export class OtcCompanyViewComponent implements OnInit{

  kupovinaFlag = true;
  zahteviFlag = false;
  ponudeFlag = false;

  stocksData: any[] = [];

  kupovinaColumns: string[] = [ "Hartija", "Kompanija", "Količina", "Cena", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Cena", "Status"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Cena", "Opcije"];

  companyID: number = 0
  sentContracts: Contract[] = []
  receivedContracts: Contract[] = []
  allContracts: Contract[] = []

  constructor(private accountService: AccountService,
              private userService : UserService,
              private exService: ExchangeService,
              private router: Router,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.mockData();
    //TODO Bek treba da se doradi
    // getAllPublicStocks();
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    let companyId = tk.id
    this.companyID = companyId

    //Zameniti mock podatke
    this.exService.getAllSentContracts(companyId).subscribe( data => {
      this.sentContracts = data
    })
    this.exService.getAllReceivedContracts(companyId).subscribe( data => {
      this.receivedContracts = data
    })
    this.exService.getAllContracts(companyId).subscribe( data => {
      this.allContracts = data
    })
  }

  getAllPublicStocks(): void{
    // this.exService.getPublicStocks().subscribe( res=> {
    //   this.stocksData = res;
    // })
  }

  buttonBuy(element: any) {
    this.dialog.open(OtcCompanyBuyPopupComponent, {
      data: element
    });
  }
  buttonDecline(element: any){
    this.dialog.open(OtcDeclinePopupComponent, {
      data: element
    })
  }
  buttonAccept(element: any){
    //TODO Otkomentarisati kada se sklone mock podaci

    // this.exService.companyAcceptContract(element.contractId, "").subscribe( data => {
    //
    // })
  }

  switchToKupovina(){
    if(this.kupovinaFlag) return;
    this.kupovinaFlag = !this.kupovinaFlag;
    this.zahteviFlag = false;
    this.ponudeFlag = false;
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

    this.stocksData = [
      {
        "stock": "Tesla Inc.",
        "user": "Tech Innovators Inc.",
        "amount": 8,
        "price": 900.00,
        "status": "ACCEPTED",
        "sellerId": 1,
        "ticker": "T",
        "contractId": 1
      },
      {
        "stock": "Amazon.com Inc.",
        "user": "Global Traders LLC",
        "amount": 15,
        "price": 3300.25,
        "status": "ACCEPTED",
        "sellerId": 2,
        "ticker": "AMZN",
        "contractId": 2
      },
      {
        "stock": "Meta Platforms Inc.",
        "user": "Digital Ventures Ltd.",
        "amount": 20,
        "price": 340.75,
        "status": "DECLINED",
        "sellerId": 3,
        "ticker": "META",
        "contractId": 3
      },
      {
        "stock": "Netflix Inc.",
        "user": "Streaming Giants Corp.",
        "amount": 12,
        "price": 550.25,
        "status": "PROCESSING",
        "sellerId": 4,
        "ticker": "NF",
        "contractId": 4
      }
    ];

  }

}
