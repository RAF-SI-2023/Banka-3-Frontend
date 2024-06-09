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
  maticniBroj: number,
  pib: number,
  sifraDelatnosti: number,

}
export interface Firm {
  companyId: number,
  title: string,
  email: string,
  number: number,
  maticniBroj: number,
  PIB: number,
  sifraDelatnosti: number,
  companyAccounts: CompanyAccount[]

}
export interface UserActivationDto{
  email: string,
  codeActive: boolean
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
  date: number
}

export interface Permission {
  permissionId: number
  permissionName: string
}

export interface Account{
  availableBalance: number,
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
  employeeId: number,
  userId: number,
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
  userId: number,
  availableBalance: number,
  reservedAmount: number,
  creationDate: number,
  expirationDate: number,
  active: boolean,
  employeeId: number,
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
  price: number,
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
  publicAmount: number,
  privateAmount: number,
  userId: number,
  companyId: number,
  version: number
}

export interface MyOptions{
  myOptionId: number,
  contractSymbol: string,
  companyId: number
  optiontype: string,
  price: number,
  ask: number,
  bid: number,
  currencyMark: string,
  quantity: number
}

export interface MyFuture{
  myFutureId: number,
  companyId: number,
  contractName: string,
  contractSize: number,
  contractUnit: string,
  maintenanceMargin: string,
  type: string,
  currencyMark: string,
  price: number,
  isPublic: boolean,
  version: number
}

export interface Options{
  optionId: number,
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

export interface MyForex{

  myForexId: number,
  companyId: number,
  quoteCurrency: string,
  amount: number,
  conversionRate: number,
  version: number

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

export interface ConfirmTransactionDto{
  transactionId: number
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

export interface CurrencyExchangeDto {
  accountFrom: string,
  accountTo: string
  amount: number
}
export interface ContractAnswerDto{
  contractId: number,
  comment: string
}
export interface Contract{
  contractId: number,
  userSellerId: number,
  userBuyerId: number,
  companySellerId: number,
  companyBuyerId: number,
  bankCertificate: string,
  sellerCertificate: string,
  comment: string,
  dateCreated: number,
  dateFinished: number,
  contractNumber: string,
  about: string,
  ticker: string,
  amount: number,
  price: number,
}

export interface FutureContract {
  futureContractId?: number;
  companySellerId: number;
  companyBuyerId: number;
  bankCertificate: BankCertificate;
  sellerCertificate: SellerCertificate;
  comment: string;
  dateCreated: number;
  dateFinished: number;
  contractNumber: string;
  about: string;
  contractName: string;
  price: number;
}

export enum BankCertificate {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export enum SellerCertificate {
  PROCESSING = 'PROCESSING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export interface BuyStockCompanyDto {
  sellerId: number;
  buyerId: number;
  ticker: string;
  amount: number;
  price: number;
}
