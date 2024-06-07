import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contract, Firm, MyStock, Stock, User } from 'src/app/models/models';
import { AccountService } from 'src/app/services/account.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';
import { BuyHartijePopupComponent } from '../../listing_components/buy-hartije-popup/buy-hartije-popup.component';
import { OtcBuyPopupComponent } from '../otc-buy-popup/otc-buy-popup.component';
import { Obj } from '@popperjs/core';
import { OtcAcceptDeclineComponent } from '../otc-accept-decline/otc-accept-decline.component';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otc-view',
  templateUrl: './otc-view.component.html',
  styleUrls: ['./otc-view.component.css']
})
export class OtcViewComponent implements OnInit, OnDestroy{

  kupovinaFlag = true;
  zahteviFlag = false;
  ponudeFlag = false;
  user = {} as User
  users: { [userId: number]: User | undefined } = {};

  stocksData: MyStock[] = [];
  sentData: Contract[] = []
  receivedData: Contract[] = []

  kupovinaColumns: string[] = [ "Hartija", "Korisnik", "Količina", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Cena", "Status"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Cena", "Opcije"];

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

    if(!hasRole){

      this.fetchPublicStocks()

      this.contractSubscription = this.WebsocketService.contractMessages.subscribe( msg => {
        this.fetchPublicStocks()

      })
      this.stockSubscription = this.WebsocketService.messages.subscribe( msg => {
        this.fetchPublicStocks()
      })
    }
  }

  fetchPublicStocks(){
    const token = sessionStorage.getItem('token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.exService.getPublicStocks(payload.id).subscribe( res => {
      this.stocksData = res;
      this.stocksData.forEach(stock => {
        this.fetchUser(stock.userId);
      });
    })
    this.exService.getAllSentRequestsUser(payload.id).subscribe( res => {
      this.sentData = res;
    })
    this.exService.getAllReceivedRequestsUser(payload.id).subscribe( res => {
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
      // if (this.futureSubscription) {
      //   this.futureSubscription.unsubscribe();
      // }
      // if (this.forexSubscription) {
      //   this.forexSubscription.unsubscribe();
      // }
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

  buttonBuy(stock: MyStock) {
    this.dialog.open(OtcBuyPopupComponent, {
      data: { stock: stock}
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
