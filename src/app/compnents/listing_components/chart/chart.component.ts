import { Component, Input } from '@angular/core';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgAreaSeriesOptions} from "ag-charts-community";

@Component({
  selector: 'app-chart',
  template: `<ag-charts-angular
  style="height: 100%;"
  [options]="options"
></ag-charts-angular> `,
})
export class ChartComponent {

  @Input() options: any;

  constructor() {
  }

  // getData() {
  //   const currentYear = new Date().getFullYear();
  //   const data = [];
  
  //   for (let i = 0; i < 5; i++) {
  //     for (let j = 1; j <= 12; j++) {
  //       const month = j < 10 ? '0' + j : '' + j;
  //       const date = `${currentYear + i}-${month}`;
  //       const value = Math.floor(Math.random() * 1000) + 100; // Generate random value
  
  //       data.push({ date: date, value: value });
  //     }
  //   }
  
  //   return data;
  // }


  
}