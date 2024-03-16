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
  role: Role
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

export interface Permission {
  role: number,
  authority: string
}

export interface Role {
  roleName: string,
}

export interface Token {
  token: string
}
