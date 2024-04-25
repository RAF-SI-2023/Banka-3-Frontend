export const MockRequests = [
  {
    stockOrderId: 1,
    employeeId: 1,
    ticker: 'AAPL',
    status: 'WAITING',
    type: 'MARKET',
    limitValue: 150.00,
    stopValue: 145.00,
    amount: 100,
    amountLeft: 100,
    aon: true,
    margine: false
  },
  {
    stockOrderId: 2,
    employeeId: 2,
    ticker: 'GOOGL',
    status: 'WAITING',
    type: 'STOP',
    limitValue: 2800.00,
    stopValue: 2750.00,
    amount: 50,
    amountLeft: 50,
    aon: false,
    margine: true
  },
  {
    stockOrderId: 3,
    employeeId: 3,
    ticker: 'AMZN',
    status: 'WAITING',
    type: 'LIMIT',
    limitValue: 3300.00,
    stopValue: 3250.00,
    amount: 200,
    amountLeft: 200,
    aon: true,
    margine: false
  }
];
