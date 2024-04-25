import {Component, OnInit} from '@angular/core';
import {Account, Card} from "../../../models/models";
import { MOCK_CARDS } from './mock-cards';
import {AccountService} from "../../../services/account.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit{

  cards: Card[] = []
  accounts: Account[] = []

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    //TODO: Testirati bek
    //Zameniti ovo kad se kreira bek
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getCardsByUserId(tk.id).subscribe( data => {
      this.cards = data;
      // console.log("Dobio kartice: " + JSON.stringify(data));
    });

    //Zakomentarisati ovo
    this.cards = MOCK_CARDS;
    this.cards.forEach(card => {
      // @ts-ignore
      card.shortCardNumber = card.cardNumber.toString().slice(0, 4) + ' ... ' + card.cardNumber.toString().slice(-4);
    });
  }
  goToAtm(){
    //TODO: Zameniti kada se implementira Bankomat-View
    // this.router.navigate(['/atm'])
  }

  hoveredCardIndex: number = -1; // Indeks kartice koja je trenutno hoverovana

  getCardNumberWithSpaces(cardNumber: number){
    let cardNumberString = cardNumber.toString()
    let formattedNumber = '';
    for (let i = 0; i < cardNumberString.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedNumber += ' ';
      }
      formattedNumber += cardNumberString[i];
    }
    return formattedNumber;
  }

}
