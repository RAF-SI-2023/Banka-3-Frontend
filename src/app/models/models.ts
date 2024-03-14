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
  position: string,
  department: string,
  permissions: Permission[],
  role: Role
}

export interface Permission {
  roleId: number,
  authority: string
}

export interface Role {
  roleName: string,
}

export interface Token {
  token: string
}
