import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string = ''
  constructor() {

  }

  getToken(): string {
    return this.token;
  }

  setToken(value: string) {
    this.token = value;
  }
}
