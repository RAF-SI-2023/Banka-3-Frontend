import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent {
  selectedButton: string; 
  exchangeActive: boolean = false;

  constructor() {
    this.selectedButton = '1d';
  }

  selectButton(buttonId: string) {
    this.selectedButton = buttonId;
  }
}
