import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PlaidService } from '../../plaid.service';

@Component({
  selector: 'app-expenses',
  imports: [MatTableModule, CommonModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];
  @Output() expensesFetched = new EventEmitter<any[]>();
  displayedColumns: string[] = ['date', 'name', 'category', 'amount'];

  constructor(private plaidService: PlaidService) {}

  ngOnInit(): void {
    this.setupPlaidIntegration();
  }


  async setupPlaidIntegration() {
    try {
      // Step 1: Create the public token
      const publicToken = await this.plaidService.createPublicToken();
      console.log('Public Token:', publicToken);

      // Step 2: Exchange the public token for an access token
      const accessToken = await this.plaidService.exchangePublicToken(publicToken);
      console.log('Access Token:', accessToken);

      // Step 3: Fetch transactions using the access token
      this.fetchExpenses(accessToken);
    } catch (error) {
      console.error('Error in Plaid integration:', error);
    }
  }

  async fetchExpenses(accessToken: string): Promise<void> {
    try {
      const transactionsResponse = await this.plaidService.getTransactions(
        '2023-01-01',
        '2023-12-31',
        accessToken
      );
      this.expenses = transactionsResponse.map((tx: any) => ({
        date: tx.date,
        name: tx.name,
        category: tx.category[0],
        amount: tx.amount,
      }));
      this.expensesFetched.emit(this.expenses);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
}
