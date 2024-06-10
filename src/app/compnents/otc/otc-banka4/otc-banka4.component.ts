import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contract, Firm, MyOfferBanka4, MyStock, OfferBanka4, Stock, StockBanka4, User } from 'src/app/models/models';
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

@Component({
  selector: 'app-otc-banka4',
  templateUrl: './otc-banka4.component.html',
  styleUrls: ['./otc-banka4.component.css']
})
export class OtcBanka4Component implements OnInit, OnDestroy{

  kupovinaFlag = true;
  zahteviFlag = false;
  ponudeFlag = false;
  user = {} as User
  users: { [userId: number]: User | undefined } = {};

  stocksData: StockBanka4[] = [];
  sentData: MyOfferBanka4[] = []
  receivedData: OfferBanka4[] = []

  kupovinaColumns: string[] = [ "Hartija", "Količina", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Cena", "Status"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Cena", "idBank4", "Status", "Opcije"];

  contractSubscription: Subscription | null = null
  stockSubscription: Subscription | null = null


  constructor(private accountService: AccountService,
              private userService : UserService,
              private exService: ExchangeService,
              private router: Router,
              private dialog: MatDialog,
              private WebsocketService: WebsocketService) {
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
    this.exService.getBank4Stocks().subscribe( res => {
      this.stocksData = res;
    })
    this.exService.getMyBank4Offers().subscribe( res => {
      this.sentData = res;
    })
    this.exService.getBank4Offers().subscribe( res => {
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

  buttonBuy(stock: StockBanka4) {
    this.dialog.open(OtcBanka4BuyPopupComponent, {
      data: { stock: stock}
    });
  }

  acceptOffer(offer: OfferBanka4){
    this.exService.acceptBank4Offer(offer.idBank4).subscribe(res => {
      console.log(res)
    })
  }
  declineOffer(offer: OfferBanka4){
    this.exService.declineBank4Offer(offer.idBank4).subscribe(res => {
      console.log(res)
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

}
