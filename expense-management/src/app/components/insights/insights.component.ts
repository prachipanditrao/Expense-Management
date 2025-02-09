import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-insights',
  imports: [NgxChartsModule, MatTableModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class InsightsComponent implements OnInit {
  @Input() expenses: any[] = [];
  categoryData: any[] = [];
  trendData: any[] = [];

  ngOnInit(): void {
    this.generateInsights();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.generateInsights();
    }
  }

  generateInsights(): void {
    const categoryMap = new Map<string, number>();

    this.expenses.forEach((expense) => {
      const category = expense.category || 'Other';
      const amount = expense.amount;
      categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
    });

    this.categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }));

  }
}
