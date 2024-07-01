import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contract, Firm, MyOffer, MyStock, Offer, Stock, BankStock, User } from 'src/app/models/models';
import { AccountService } from 'src/app/services/account.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';
import { BuyHartijePopupComponent } from '../../listing_components/buy-hartije-popup/buy-hartije-popup.component';
import { OtcBuyPopupComponent } from '../otc-buy-popup/otc-buy-popup.component';
import { Obj } from '@popperjs/core';
import { OtcAcceptDeclineComponent } from '../otc-accept-decline/otc-accept-decline.component';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';
import { OtcBanka4BuyPopupComponent } from '../otc-banka4-buy-popup/otc-banka4-buy-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bank-otc',
  templateUrl: './bank-otc.component.html',
  styleUrls: ['./bank-otc.component.css']
})
export class BankOtcComponent implements OnInit, OnDestroy{

  kupovinaFlag = true;
  zahteviFlag = false;
  ponudeFlag = false;
  user = {} as User
  users: { [userId: number]: User | undefined } = {};

  stocksData: BankStock[] = [];
  sentData: MyOffer[] = []
  receivedData: Offer[] = []

  kupovinaColumns: string[] = [ "Hartija", "Količina", "Vlasnik", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Vlasnik", "Cena", "Status", "Opcije"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Vlasnik","Cena", "Status", "Opcije"];

  contractSubscription: Subscription | null = null
  stockSubscription: Subscription | null = null


  constructor(private accountService: AccountService,
              private userService : UserService,
              private exService: ExchangeService,
              private router: Router,
              private dialog: MatDialog,
              private WebsocketService: WebsocketService,
             private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    // getAllPublicStocks();
    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const hasRole = "role" in payload;


    this.fetchPublicStocks()

    this.contractSubscription = this.WebsocketService.contractMessages.subscribe( msg => {
      this.fetchPublicStocks()

    })
    this.stockSubscription = this.WebsocketService.messages.subscribe( msg => {
      this.fetchPublicStocks()
    })
  }

  fetchPublicStocks(){
    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.exService.getBankStocks().subscribe( res => {
      this.stocksData = res;
    })
    this.exService.getMyBankOffers().subscribe( res => {
      this.sentData = res;
    })
    this.exService.getBankOffers().subscribe( res => {
      this.receivedData = res;
    })
  }

  ngOnDestroy(): void {
      if (this.stockSubscription) {
        this.stockSubscription.unsubscribe();
      }
      if (this.contractSubscription) {
        this.contractSubscription.unsubscribe();
      }
  }
    fetchUser(userId: number){
      if (!this.users[userId]) {
        this.userService.getUserById(userId).subscribe(user => {
          this.users[userId] = user;
        });
    }}

  getAllPublicStocks(): void{
    // this.exService.getPublicStocks().subscribe( res=> {
    //   this.stocksData = res;
    // })
  }

  buttonBuy(stock: BankStock) {
    this.dialog.open(OtcBanka4BuyPopupComponent, {
      data: { stock: stock}
    });
  }

  acceptOffer(offer: Offer){
    this.exService.acceptBankffer(offer.offerId).subscribe(res => {
      console.log(res)
      this.openSuccessSnackBar("Uspešno ste prihvatili ponudu.")
    }, err => {
      this.openSuccessSnackBar("Došlo je do greške.")
      console.log(err)
    })
  }
  declineOffer(offer: Offer){
    this.exService.declineBankOffer(offer.offerId).subscribe(res => {
      console.log(res)
      this.openSuccessSnackBar("Uspešno ste odbili ponudu.")
    }, err => {
      this.openSuccessSnackBar("Došlo je do greške.")
      console.log(err)
    })

  }
  refreshData(){
    this.exService.refreshData().subscribe(res => {
      console.log(res)
    })
  }

  deleteMyOffer(offerId: number){
    this.exService.deleteMyOffer(offerId).subscribe(res => {
      console.log(res)
      this.openSuccessSnackBar("Uspešno ste izbrisali zahtev.")
    },err => {
      this.openSuccessSnackBar("Došlo je do greške.")
      console.log(err)
    })
  }
  deleteOffer(offerId: number){
    this.exService.deleteOffer(offerId).subscribe(res => {
      console.log(res)
      this.openSuccessSnackBar("Uspešno ste izbrisali ponudu.")
    }, err => {
      this.openSuccessSnackBar("Došlo je do greške.")
      console.log(err)
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

  }
  openSuccessSnackBar(message:string) {
    this.snackBar.open(message, 'Zatvori', {
      duration: 3000,
    });
  }


}
