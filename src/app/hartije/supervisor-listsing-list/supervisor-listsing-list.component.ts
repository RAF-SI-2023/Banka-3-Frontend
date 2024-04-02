import { Component } from '@angular/core';
import {MockRequests} from "./mock-requests";


@Component({
  selector: 'app-supervisor-listsing-list',
  templateUrl: './supervisor-listsing-list.component.html',
  styleUrls: ['./supervisor-listsing-list.component.css']
})
/*
Izlistavanje hartija koje je podneo zahtev agent... treba da ima dugme da odbije i prihvati
 */
export class SupervisorListsingListComponent {
  //TODO: Potrebno zameniti MockRequests u html-u kada se odradi bek
  protected readonly MockRequests  = MockRequests;
  requests: Request[] = []
  constructor() {
  }
  ngOnInit() {

  }
  acceptRequest() {

  }
  rejectRequest() {

  }

}
