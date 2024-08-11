import { Component } from '@angular/core';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.component.html',
  styleUrls: ['./details-annonce.component.css']
})
export class DetailsAnnonceComponent {
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
