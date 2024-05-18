import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Firm, Stock, User } from 'src/app/models/models';
import { AccountService } from 'src/app/services/account.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { UserService } from 'src/app/services/user.service';
import { BuyHartijePopupComponent } from '../../listing_components/buy-hartije-popup/buy-hartije-popup.component';
import { OtcBuyPopupComponent } from '../otc-buy-popup/otc-buy-popup.component';
import { Obj } from '@popperjs/core';

@Component({
  selector: 'app-otc-view',
  templateUrl: './otc-view.component.html',
  styleUrls: ['./otc-view.component.css']
})
export class OtcViewComponent implements OnInit{

  kupovinaFlag = true;
  zahteviFlag = false;  
  ponudeFlag = false;

  stocksData: any[] = [];

  kupovinaColumns: string[] = [ "Hartija", "Korisnik", "Količina", "Cena", "Opcije"];
  zahteviColumns: string[] = [ "Hartija", "Količina", "Cena", "Status"];
  ponudeColumns: string[] = [ "Hartija", "Količina", "Cena", "Opcije"];


  constructor(private accountService: AccountService, 
              private userService : UserService, 
              private exService: ExchangeService,
              private router: Router,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.mockData();
    // getAllPublicStocks();
  }

  getAllPublicStocks(): void{
    // this.exService.getPublicStocks().subscribe( res=> {
    //   this.stocksData = res;
    // })
  }

  buttonBuy(element: any) {
    this.dialog.open(OtcBuyPopupComponent, {
      data: { stock: element.stock}
    });
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

    this.stocksData = [
      {
        "stock": "Tesla Inc.",
        "user": "alice_smith",
        "amount": 8,
        "price": 900.00,
        "status": "ACCEPTED"
      },
      {
        "stock": "Amazon.com Inc.",
        "user": "bob_johnson",
        "amount": 15,
        "price": 3300.25,
        "status": "ACCEPTED"
      },
      {
        "stock": "Meta Platforms Inc.",
        "user": "emma_wilson",
        "amount": 20,
        "price": 340.75,
        "status": "DECLINED"
      },
      {
        "stock": "Netflix Inc.",
        "user": "chris_miller",
        "amount": 12,
        "price": 550.25,
        "status": "PROCESSING"
      },
    ];
  }


}
