import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Contract, MyForex, MyFuture, MyOptions, MyStock } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  apiUrlExchangeService: string = environment.exchangeServiceUrl + "/api/v1"
  apiUrlWebSocket: string = environment.exchangeServiceWebSocket + "/ws"

  private socket: WebSocket;
  private futureSocket: WebSocket;
  private forexSocket: WebSocket;
  private contractSocket: WebSocket;
  private optionsSocket: WebSocket;



  private subject: Subject<MyStock> = new Subject<MyStock>();
  private futureSubject: Subject<MyFuture> = new Subject<MyFuture>();
  private forexSubject: Subject<MyForex> = new Subject<MyForex>();
  private contractSubject: Subject<Contract> = new Subject<Contract>();
  private optionsSubject: Subject<MyOptions> = new Subject<MyOptions>();

  constructor() {

    this.socket = new WebSocket(`${this.apiUrlWebSocket}/stocks`);
    this.futureSocket = new WebSocket(`${this.apiUrlWebSocket}/futures`);
    this.forexSocket = new WebSocket(`${this.apiUrlWebSocket}/forex`);
    this.contractSocket = new WebSocket(`${this.apiUrlWebSocket}/contract`);
    this.optionsSocket = new WebSocket(`${this.apiUrlWebSocket}/option`);


    this.socket.onopen = () => {
      console.log('Stock WebSocket connected');
    };
    this.futureSocket.onopen = () => {
      console.log('Future WebSocket connected');
    };
    this.forexSocket.onopen = () => {
      console.log('Forex WebSocket connected');
    };



    this.socket.onmessage = (event) => {
      console.log('Stock Message received from server:', event.data);
      this.subject.next(event.data);

    };
    this.futureSocket.onmessage = (event) => {
      console.log('Future received from server:', event.data);
      this.futureSubject.next(event.data);

    };
    this.forexSocket.onmessage = (event) => {
      console.log('Forex received from server:', event.data);
      this.forexSubject.next(event.data);

    };
    this.contractSocket.onmessage = (event) => {
      console.log('Contract received from server:', event.data);
      this.forexSubject.next(event.data);

    };
    this.optionsSocket.onmessage = (event) => {
      console.log('Contract received from server:', event.data);
      this.optionsSubject.next(event.data);

    };




    this.socket.onclose = () => {
      console.log('Stock WebSocket disconnected');
      this.socket.close()
    };

    this.futureSocket.onclose = () => {
      console.log('Future WebSocket disconnected');
      this.futureSocket.close()
    };

    this.forexSocket.onclose = () => {
      console.log('Forex WebSocket disconnected');
      this.forexSocket.close()
    };

    this.contractSocket.onclose = () => {
      console.log('Contract WebSocket disconnected');
      this.contractSocket.close()
    };
    this.optionsSocket.onclose = () => {
      console.log('Contract WebSocket disconnected');
      this.optionsSocket.close()
    };
  }

  get messages(): Observable<MyStock> {
    return this.subject.asObservable();
  }
  get futureMessages(): Observable<MyFuture> {
    return this.futureSubject.asObservable();
  }
  get forexMessages(): Observable<MyForex> {
    return this.forexSubject.asObservable();
  }
  get contractMessages(): Observable<Contract> {
    return this.contractSubject.asObservable();
  }
  get optionsMessages(): Observable<MyOptions> {
    return this.optionsSubject.asObservable();
  }
}

