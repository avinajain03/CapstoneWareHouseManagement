import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Thoughtbridge',
      'Mydeo',
      'Skinix',
      'Divanoodle'
    ],
    datasets: [
      {
        data: [ 345, 150, 278, 247],
        label: 'Supplier Vs Quantity',
        fill: true,
        tension: 0.75,
        borderColor: 'black',
        backgroundColor: 'rgba(70, 130, 180, 0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      'food',
      'personal care',
      'household',
      'beverages'
    ],
    datasets: [
      {
        data: [628,225,253,102],
        label: 'Category Vs Quantity',
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    
  };
  
  public pieChartLegend = true;
  
  public pieChartType: ChartType = 'pie';

}
