import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit{

  selectedCurrency1: string = '';
  selectedCurrency2: string = ''; 
  money1: string = '';
  money2: number = 0;

  ngOnInit(): void {
    this.selectedCurrency1 = 'RSD';
    this.selectedCurrency2 = 'EUR';
  }

  onConvert(currency1: string, currency2: string, money1: string): void {
    console.log('Selected Currency 1:', currency1);
    console.log('Selected Currency 2:', currency2);
    console.log('Money 1:', money1);

    //menjanje polja u novu vrednost
    this.money2 =  parseFloat(money1 || '0') + 5; 
    console.log(this.money2)

    //pozvati metodu za menjanje u drugu valutu
  }
}
