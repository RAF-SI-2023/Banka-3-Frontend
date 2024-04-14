import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Options } from '../models/models';
import {ExchangeService} from "../services/exchange.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  options: Options[] = [];
  //displayedOptions: Options[] = [];
  calls: Options[] = [];
  puts: Options[] = [];
  ticker: string = '';
  optionColumns: string[] = ['contractSymbol','stockListing','ask', 'bid', 'change', 'impliedVolatility', 'lastRefresh', 'openInterest', 'optionType', 'strike', 'lastPrice', 'volume', 'opcije'];
  callsFlag = true;
  putsFlag = false;
  selectedDate: string | null = null;

  constructor(private route: ActivatedRoute, private exchange: ExchangeService) {
  } // Inject ActivatedRoute


  // TODO Otkomentarisi ovaj deo i povezi sa bekendom
  // loadOptions(optionType: string): void {
  //   let apiUrl: string;
  //   if (optionType === 'call') {
  //     apiUrl = '/api/v1/option/calls/{ticker}';
  //     this.callsFlag = true;
  //     this.putsFlag = false;
  //   } else if (optionType === 'put') {
  //     apiUrl = '/api/v1/option/puts/{ticker}';
  //     this.callsFlag = false;
  //     this.putsFlag = true;
  //   }

  //   this.http.get<Options[]>(apiUrl).subscribe(
  //     (response) => {
  //       this.displayedOptions = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching options:', error);
  //     }
  //   );
  // }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticker = params.get('ticker') ?? '';
    })
    //this.loadMockOptions();
    //this.switchToOptions("call");
    this.refresh();
    this.callAfter15();

  }

  loadMockOptions(): void {
    // Mock data array with settlementDate property (YYYY-MM-DD format)
    this.options = [
      {
        optionsId: 1,
        ask: 100,
        bid: 90,
        change: 5,
        contractSymbol: 'ABC',
        impliedVolatility: 0.2,
        lastRefresh: 20052001,
        openInterest: 1000,
        optionType: 'call',
        price: 105,
        settlementDate: 20240410,
        stockListing: 'XYZ',
        strikePrice: 95,
        volume: 500
      },
      {
        optionsId: 2,
        ask: 110,
        bid: 100,
        change: 8,
        contractSymbol: 'DEF',
        impliedVolatility: 0.25,
        lastRefresh: 20052001,
        openInterest: 800,
        optionType: 'put',
        price: 112,
        settlementDate: 20240515,
        stockListing: 'UVW',
        strikePrice: 105,
        volume: 700
      },
      // Add more mock options as needed
    ];
  }

  callAfter15() {
    // Definišite funkciju koja se treba pozvati
     this.refresh();


    const interval = setInterval(this.refresh, 15 * 60 * 1000);


    setTimeout(() => {
      clearInterval(interval);
      console.log("Interval je zaustavljen nakon 24 sata.");
    }, 24 * 60 * 60 * 1000);
  }


  switchToOptions(optionType: string): void {
    this.loadOptions(optionType);
  }

  convertDateFormat(dateNumber: number): string {
    const year = String(dateNumber).slice(0, 4);
    const month = String(dateNumber).slice(4, 6);
    const day = String(dateNumber).slice(6);

    return `${year}/${month}/${day}`;
  }

  loadOptions(optionType: string): void {

    if (optionType === 'call') {
      this.callsFlag = true;
      this.putsFlag = false;
    } else if (optionType === 'put') {
      this.callsFlag = false;
      this.putsFlag = true;
    }
    this.refresh()
    // Apply date filter

  }

  filterByDate(options: Options[]): Options[] {
    if (this.selectedDate !== null && this.selectedDate !== undefined) {
      const year = this.selectedDate.substring(0, 4);
      const month = this.selectedDate.substring(5, 7);
      const day = this.selectedDate.substring(8, 10);

      const filteredOptions = options.filter(option => {
        const dateString = this.convertDateFormat(option.settlementDate);
        const optionDate = new Date(dateString);
        return (
          optionDate.getFullYear() === parseInt(year) &&
          optionDate.getMonth() === parseInt(month) - 1 &&
          optionDate.getDate() === parseInt(day)
        );
      });

      return filteredOptions;
    } else {
      return options; // If no date is selected, return unfiltered options
    }
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDate = selectedDate;
    this.loadOptions(this.callsFlag ? 'call' : 'put'); // Reload options based on the selected date and current option type
  }


  buyOption(option: Options): void {

  }

  sellOption(option: Options): void {

  }

  // Add more methods as needed

  refresh() {
    this.exchange.getAllPuts(this.ticker).subscribe(
      (response) => {
        this.puts = response;
        console.log(this.puts);
      });

    this.exchange.getAllCalls(this.ticker).subscribe(
      (response) => {
        this.calls = response;
        console.log(this.calls);
      });
  }

  protected readonly formatDate = formatDate;
}
