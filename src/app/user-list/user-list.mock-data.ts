import { User } from "../models/models";

export const MOCK_USERS: User[] = [
    {
      id: 1,
      ime: 'Marko',
      prezime: 'Markovic',
      jmbg: '0101984758234',
      datum: new Date('1998-01-01'),
      email: 'marko@example.com',
      telefon: '0611234567',
      permisije: ['Perms']
    },
    {
      id: 2,
      ime: 'Ana',
      prezime: 'Anic',
      jmbg: '0505938788234',
      datum: new Date('1993-05-05'),
      email: 'ana@example.com',
      telefon: '0649876543',
      permisije: ['Perms']
    },
    {
        id: 3,
        ime: 'Ivan',
        prezime: 'Ivanovic',
        jmbg: '0202956723456',
        datum: new Date('1995-02-02'),
        email: 'ivan@example.com',
        telefon: '0651112233',
        permisije: ['Perms']
      },
      {
        id: 4,
        ime: 'Jovana',
        prezime: 'Jovanovic',
        jmbg: '2807979834567',
        datum: new Date('1997-07-28'),
        email: 'jovana@example.com',
        telefon: '0623334445',
        permisije: ['Perms']
      },
      {
        id: 5,
        ime: 'Stefan',
        prezime: 'Stefanovic',
        jmbg: '1103999876543',
        datum: new Date('1999-03-11'),
        email: 'stefan@example.com',
        telefon: '0635556667',
        permisije: ['Perms']
      }
  ];

  export const MOCK_EMPLOYEES: User[] = [
    {
      id: 6,
      ime: 'Petar',
      prezime: 'Petrovic',
      jmbg: '1504957123456',
      datum: new Date('1995-04-15'),
      email: 'petar@example.com',
      telefon: '0612345678',
      permisije: ['Perms']
    },
    {
      id: 7,
      ime: 'Milica',
      prezime: 'Milic',
      jmbg: '2512888234567',
      datum: new Date('1988-12-25'),
      email: 'milica@example.com',
      telefon: '0648765432',
      permisije: ['Perms']
    },
    {
      id: 8,
      ime: 'Marko',
      prezime: 'Markovic',
      jmbg: '0705963456789',
      datum: new Date('1996-05-07'),
      email: 'marko@example.com',
      telefon: '0659876543',
      permisije: ['Perms']
    },
    {
      id: 9,
      ime: 'Jelena',
      prezime: 'Jovanovic',
      jmbg: '1804908765432',
      datum: new Date('1990-04-18'),
      email: 'jelena@example.com',
      telefon: '0623334455',
      permisije: ['Perms']
    },
    {
      id: 10,
      ime: 'Filip',
      prezime: 'Filipovic',
      jmbg: '2203962345678',
      datum: new Date('1996-03-22'),
      email: 'filip@example.com',
      telefon: '0635554443',
      permisije: ['Perms']
    }
  ];