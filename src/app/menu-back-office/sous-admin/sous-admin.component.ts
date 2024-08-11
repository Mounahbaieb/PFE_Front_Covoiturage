import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sous-admin',
  templateUrl: './sous-admin.component.html',
  styleUrls: ['./sous-admin.component.css']
})
export class SousAdminComponent {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  chart: any
  
    selectDate(day: number): void {
      if (day !== 0) {
        console.log('Selected Date:', day);
      }
}
}
