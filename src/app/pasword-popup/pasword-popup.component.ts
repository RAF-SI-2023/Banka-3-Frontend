import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pasword-popup',
  templateUrl: './pasword-popup.component.html',
  styleUrls: ['./pasword-popup.component.css']
})
export class PaswordPopupComponent {
  password:string ='';
  newPass:string = '';
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
