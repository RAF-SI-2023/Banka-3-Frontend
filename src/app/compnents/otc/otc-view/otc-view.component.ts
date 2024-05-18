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
import { Contract, ContractAnswerDto } from 'src/app/models/models';
@Component({
  selector: 'app-otc-view',
  templateUrl: './otc-view.component.html',
  styleUrls: ['./otc-view.component.css']
})
export class OtcViewComponent implements OnInit{

  kupovinaFlag = true;
  zahteviFlag = false;
  ponudeFlag = false;

  stocksData: Contract[] = [];

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
   // this.mockData();
    this.getAllContracts();
    // getAllPublicStocks();
  }

  getAllPublicStocks(): void{
    // this.exService.getPublicStocks().subscribe( res=> {
    //   this.stocksData = res;
    // })
  }
  getAllContracts(): void {
    this.accountService.getAllContracts().subscribe(
      (contracts: Contract[]) => {
        console.log('Fetched contracts:', contracts);
        this.stocksData = contracts;
      },
      (error) => {
        console.error('Error fetching contracts:', error);
      }
    );
  }
  acceptOffer(element: Contract): void {
    console.log('Accepting offer:', element);
    const contractAnswerDto: ContractAnswerDto = {
      contractId: element.contractId,
      comment: 'Accepted by supervisor'
    };
    this.accountService.supervisorAccept(contractAnswerDto).subscribe(response => {
      console.log('Contract accepted', response);
      this.getAllContracts(); // Refresh the list of contracts
    });
  }

  declineOffer(element: Contract): void {
    console.log('Declining offer:', element);
    const contractAnswerDto: ContractAnswerDto = {
      contractId: element.contractId,
      comment: 'Declined by supervisor'
    };
    this.accountService.supervisorDecline(contractAnswerDto).subscribe(response => {
      console.log('Contract declined', response);
      this.getAllContracts(); // Refresh the list of contracts
    });
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
}
