import { Component } from '@angular/core';
import { User } from '../models/models';
import { MOCK_USERS } from './user-list.mock-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = MOCK_USERS;
  userColumns: string[] = [ "id","ime", "prezime","jmbg", "datum", "email","telefon", "permisije", "opcije"]


}
