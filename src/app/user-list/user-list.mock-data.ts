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