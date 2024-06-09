import { Component, OnInit } from '@angular/core';
import {MOCK_PROFITS} from "./mock-profits";
import {AccountService} from "../../services/account.service";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'app-profit-table',
  templateUrl: './profit-table.component.html',
  styleUrls: ['./profit-table.component.css']
})
export class ProfitTableComponent implements OnInit{
  exchange: any[] = [];
  agents: any = {};
  taxes: any[] = []
  exchangeColumns: string[] = ['amount', 'currency'];
  agentColumns: string[] = ['id','totalAmount'];
  taxesColumns: string[] = ['amount'];
  exchangeFlag = true
  agentFlag = false
  taxFlag = false
  id: number = 0;
  errorMessage: string = '';

  constructor(private accountService: AccountService,private exchangeService: ExchangeService) {
  }

  ngOnInit(): void {
    if (this.isOurCompanyCheck()) {
      this.fetchExchangeProfits();
    }
    this.exchangeService.getTaxes().subscribe(res => {
      this.taxes = res
    })
  }

  switchToAgent() {
    if (this.agentFlag) return;
    this.agentFlag = true;
    this.exchangeFlag = false;
    this.taxFlag = false
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
    this.taxFlag = false
    this.accountService.getProfits().subscribe(res => {
      this.exchange = res
    })
  }
  switchToTax() {
    if (this.taxFlag) return;
    this.taxFlag = true
    this.exchangeFlag = false
    this.agentFlag = false
    this.exchangeService.getTaxes().subscribe(res => {
      this.taxes = res
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
