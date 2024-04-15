export interface User {
  userId: number,
  firstName: string,
  lastName: string,
  jmbg: string,
  dateOfBirth: number,
  gender: string,
  phoneNumber: string,
  address: string,
  email: string,
  isActive: boolean,
}

export interface Employee {
  employeeId: number,
  firstName: string,
  lastName: string,
  username: string,
  jmbg: string,
  dateOfBirth: number,
  gender: string,
  phoneNumber: string,
  address: string,
  email: string,
  isActive: boolean,
  permissions: Permission[],
  role: Role
}

export interface FirmCreateDto {
  companyId: number,
  title: string,
  email: string,
  number: number,
  matBr: number,
  pib: number,
  sifraDelatnosti: number,

}
export interface Firm {
  companyId: number,
  title: string,
  email: string,
  number: number,
  maticnibroj: number,
  pib: number,
  sifraDelatnosti: number,
  companyAccounts: CompanyAccount[]

}
export interface UserActivationDto{
  email: string,
  active: boolean
}
export interface CompanyAccount{
  companyAccountId: number,
  company: Firm,
  balance: number,
  availableBalance: number,
  employee: Employee,
  creationDate: number,
  expireDate: number,
  active: boolean,
  currency: Currency,
  accountNumber: string,
}

export interface Currency{
  currencyId: number,
  name: string,
  mark: string
}
export interface TransactionDto{
  accountFrom: string,
  accountTo: string,
  amount: number,
  currencyMark: string,
  sifraPlacanja: number,
  pozivNaBroj: string
}

export interface Permission {
  permissionId: number
  permissionName: string
}

export interface Account{
  balance: number,
  accountType: string,
  mark: string,
  employeeId: number,
  userId: number,
}

export interface Currency{
  currencyId: number,
  name: string,
  mark: string
}
export interface Role {
  roleId: number | undefined,
  roleName: string,
}

export interface Token {
  token: string
}


export interface Contact{
  id: number,
  userId: number,
  myName: string,
  name: string,
  accountNumber: string
}

export interface CreditRequestDto{
  creditRequestId: number,
  user: User,
  name: string,
  amount: number,
  accountNumber: string
  paymentPeriod: number,
  currencyMark: string,
  status: string
}
export interface Credit{
  creditId:number,
  user: User,
  name: string,
  accountNumber: string,
  amount: number,
  paymentPeriod: number,
  fee: number,
  startDate: number,
  endDate: number,
  monthlyFee: number,
  remainingAmount: number,
  currencyMark: string,
}

export interface AccountDto{
  accountId: number,
  accountNumber: string,
  user: User,
  availableBalance: number,
  reservedAmount: number,
  creationDate: number,
  expirationDate: number,
  active: boolean,
  employee: Employee,
  currency: Currency,
  accountType: any,
}


export interface Transactions{
  id: number,
  date: string,
  description: string,
  amount: number,
  tradeAccount:string
}

export interface CreditRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  amount: number;
  description: string;
}

export interface CreditRequestCreateDto {
  userId: number;
  name: string;
  accountNumber: string;
  amount: number;
  applianceReason: string;
  employed: boolean;
  dateOfEmployment: number;
  paymentPeriod: number;
  currencyMark: string;
}

export interface Future{
  futureId: number,
  contractName: string,
  contractSize: number,
  contractUnit: string,
  maintenanceMargin: number,
  type: string

}
export interface Stock{
  stockId: number,
  name: string,
  exchange: string,
  lastRefresh: number,
  ticker : string
  price : number
  ask : number
  bid : number
  change : number
  volume : number
}

export interface MyStock{
  myStockId: number,
  ticker: string,
  amount: number,
  version: number
}
export interface MyFuture{
  myFutureId: number,
  contractName: string,
  amount: number,
  version: number
}

export interface Options{
  optionsId: number,
  ask: number,
  bid: number,
  change: number,
  contractSymbol: string,
  impliedVolatility: number,
  lastRefresh: number,
  openInterest: number,
  optionType: string,
  price: number,
  settlementDate: number,
  stockListing: string,
  strikePrice: number,
  volume: number,
}
export interface Forex{

  forexId: number,
  baseCurrency: string,
  quoteCurrency: string,
  conversionRate: number,
  lastRefresh: number

}

export interface Daily{
  stockDailyId:number,
  date: number,
  price: number,
  ticker: string
}

export interface Weekly{
  stockWeeklyId:number,
  date: number,
  price: number,
  ticker: string
}

export interface Intraday{
  stockIntradayId:number,
  date: number,
  price: number,
  ticker: string
}

export interface Monthly{
  stockMonthlyId:number,
  date: number,
  price: number,
  ticker: string
}

export interface Card{
  cvv: number,
  expireDate: number,
  cardNumber: number,
  cardId: number,
  accountNumber: number
}

export interface Actuary{
  actuaryId: number
  employeeId: number,
  email: string,
  role: string,
  limitValue: number,
  limitUsed: number,
  orderRequest: boolean
}

export interface RequestDto {
  stockOrderId: number,
  employeeId: number,
  ticker: string,
  status: string,
  type: string,
  limitValue: number,
  stopValue: number,
  amount: number,
  amountLeft: number,
  aon: boolean,
  margine: boolean,
  currencyMark: string
}
