import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdate'
})
export class FormatdatePipe implements PipeTransform {

  transform(expireDate: number): string {
    const date = new Date(expireDate);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // dodavanje nule ispred ako je mesec manji od 10
    const year = date.getFullYear().toString().slice(-2); // uzimanje poslednje dve cifre godine
    return `${month}/${year}`;
  }

}
