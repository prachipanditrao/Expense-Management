import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { InsightsComponent } from './components/insights/insights.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpensesComponent, InsightsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expense-management';
  expenses: any[] = [];

  updateExpenses(expenses: any[]): void {
    this.expenses = expenses;
  }
}
