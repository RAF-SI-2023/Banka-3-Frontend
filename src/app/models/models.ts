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
  isActive: boolean
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


export interface Permission {
  permissionId: number
  authority: string
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
  contactId: number,
  userId: number,
  myName: string,
  name: string,
  accountNumber: string
}
