import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  chart: any

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
      this.createChartCarre();
     this.createChartCarredoube()
      
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let day = 1;
    let week: number[] = [];
    for (let i = 0; i < 42; i++) {
      if (i >= firstDayOfMonth && day <= daysInMonth) {
        week.push(day);
        day++;
      } else {
        week.push(0);
      }
      if (i % 7 === 6) {
        this.weeks.push(week);
        week = [];
      }
    }
  }

  selectDate(day: number): void {
    if (day !== 0) {
      console.log('Selected Date:', day);
    }
  }
 

    
 

 
 createChartCarredoube(): void {
  const ctx = document.getElementById('doubleSinusoidalChart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, {
   
      data: {
          datasets: [{
              type: 'line',
              label: 'Bar Dataset',
              data: [10,0,1,2,3,4,5,6,7,8,9,10,20,0,10,0,20,20,0],
              borderColor: 'blue',
               borderWidth: 3
          },
          {
            type: 'line',
            label: 'Bar Dataset',
            data: [ 0,10,10,0,20,0,10,10,0,20],
             borderColor: 'orange',
            borderWidth: 3
        }],
          labels:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
  }
 
  createChartSimple(): void {
    const ctx = document.getElementById('mycartSimple') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
     
        data: {
            datasets: [{
                type: 'line',
                label: 'Bar Dataset',
                data: [10, 30, 20,14,90,29],
                borderColor: 'blue',
                 borderWidth: 3
            },
           ],
            labels:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
    }

createChartCarre(): void {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, {
   
      data: {
          datasets: [{
              type: 'bar',
              label: 'Bar Dataset',
              data: [10, 30, 50,70,90],
              borderColor: 'blue',
              maxBarThickness:10,
              borderWidth: 15
          },
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [ 50, 40, 60,40,100],
            maxBarThickness:10,
            borderColor: 'orange',
            borderWidth: 15
        }],
          labels:  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });
  }
}
