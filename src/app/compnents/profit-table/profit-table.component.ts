import { Component } from '@angular/core';
import {MOCK_PROFITS} from "./mock-profits";
import {AccountService} from "../../services/account.service";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-profit-table',
  templateUrl: './profit-table.component.html',
  styleUrls: ['./profit-table.component.css']
})
export class ProfitTableComponent {
  exchange: any[] = [];
  agents: any = {};
  exchangeColumns: string[] = ['amount', 'currency'];
  agentColumns: string[] = ['id','totalAmount'];
  exchangeFlag = true
  agentFlag = false
  id: number = 0;
  errorMessage: string = '';

  constructor(private accountService: AccountService,private exchangeService: ExchangeService) {
  }

  ngOnInit(): void {
    if (this.isOurCompanyCheck()) {
      this.fetchExchangeProfits();
    }
  }

  switchToAgent() {
    if (this.agentFlag) return;
    this.agentFlag = true;
    this.exchangeFlag = false;
    this.exchangeService.getAgentProfits().subscribe(
      res => {
        this.groupProfitsByAgent(res);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }
  switchToExchange() {
    if (this.exchangeFlag) return;
    this.exchangeFlag = true
    this.agentFlag = false
    this.accountService.getProfits().subscribe(res => {
      this.exchange = res
    })
  }
  isOurCompanyCheck(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.id = payload.id;
      if (payload.role === 'ROLE_COMPANY' && this.id === 1) {
        return true;
      }
    }
    return false;
  }
  fetchExchangeProfits() {
    this.accountService.getProfits().subscribe(
      (data: any) => {
        this.exchange = data;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }
  private groupProfitsByAgent(profits: any[]) {
    this.agents = profits.reduce((acc, profit) => {
      if (!acc[profit.agentId]) {
        acc[profit.agentId] = {
          id: profit.agentId,
          totalAmount: 0,
          profits: []
        };
      }
      acc[profit.agentId].totalAmount += profit.amount;
      acc[profit.agentId].profits.push(profit);
      return acc;
    }, {});
    this.agents = Object.values(this.agents);
  }
}
