import {Component, OnInit} from '@angular/core';
import {Account, Card} from "../models/models";
import {CardService} from "../services/card.service";
import { MOCK_CARDS } from './mock-cards';
import {AccountService} from "../services/account.service";
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

  constructor(private cardService: CardService, private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    //TODO: Testirati bek
    //Zameniti ovo kad se kreira bek
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountService.getAccountsByUserId(tk.id).subscribe( data => {
      const accounts = data
      for (let acc of accounts){
        this.cardService.getCardsByAccountNumber(+acc.accountNumber).subscribe( res => {
          for (let card of res) {
            this.cards.push(card);
          }
          console.log("Found a card.")
        })
      }
    });

    //Zakomentarisati ovo
    this.cards = MOCK_CARDS;
  }

  isPopupVisible = false;
  selectedCard: Card | null = null;

  onCardClick(card: Card): void {
    this.selectedCard = card;
    this.isPopupVisible = true; // Ovo otvara popup
  }

  closePopup(): void {
    this.isPopupVisible = false; // Ovo zatvara popup
  }

  goToAtm(){
    //TODO: Zameniti kada se implementira Bankomat-View
    // this.router.navigate(['/atm'])
  }

}
