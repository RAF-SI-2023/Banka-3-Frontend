import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { MyStock } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  apiUrlExchangeService: string = environment.exchangeServiceUrl + "/api/v1"

  private socket: WebSocket;
  private subject: Subject<MyStock> = new Subject<MyStock>();

  constructor() {

    this.socket = new WebSocket('ws://localhost:8083/ws/stocks');


    this.socket.onopen = () => {
      console.log('WebSocket connected');

    };

    this.socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      this.subject.next(event.data);

    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      // Handle WebSocket closed
      this.socket.close()
    };
  }

  get messages(): Observable<MyStock> {
    return this.subject.asObservable();
  }
}

