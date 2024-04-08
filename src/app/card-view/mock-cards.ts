// mock-cards.ts

import {Card} from "../models/models";

export const MOCK_CARDS: Card[] = [
  {
    cvv: 260,
    expireDate: new Date('2026-01-01').getTime(),
    cardNumber: 4123456789012335,
    cardId: 17870,
    accountNumber: 22222222222
  },
  {
    cvv: 161,
    expireDate: new Date('2026-04-01').getTime(),
    cardNumber: 5123456789012347,
    cardId: 92314,
    accountNumber: 22222222222
  },
  {
    cvv: 969,
    expireDate: new Date('2027-11-01').getTime(),
    cardNumber: 1218321326574584,
    cardId: 28452,
    accountNumber: 22222222222
  },
];
