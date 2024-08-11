import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AuthServicesService } from 'src/Service/auth-services.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  currentDate: Date = new Date();
  totalAnnonces: number = 0;
  totalReservations: number = 0;
  percentage: number = 0;
  chart: any;

  constructor(private router: Router, private authService:AuthServicesService) { }

  ngOnInit(): void {
    this.fetchData(); // Méthode pour obtenir les données
    this.createChartCarre();
    this.createChartCarredoube();
    
  }

  fetchData(): void {
    // Remplacez ces valeurs par les appels à vos services
    this.totalAnnonces = 120; // Exemple
    this.totalReservations = 30; // Exemple
    
    // Calculer le pourcentage
    if (this.totalAnnonces > 0) {
      this.percentage = (this.totalReservations / this.totalAnnonces) * 100;
    }
  }
  redirectToForm(): void {
    const conducteurId = this.authService.getConducteurId();
    if (conducteurId) {
      this.router.navigate([`/conducteurs/${conducteurId}`]);
    } else {
      console.warn('ID du conducteur non défini');
    }
  }
  createChartCarredoube(): void {
    const ctx = document.getElementById('doubleSinusoidalChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
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
          data: [0,10,10,0,20,0,10,10,0,20],
          borderColor: 'orange',
          borderWidth: 3
        }],
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
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
      type: 'bar',
      data: {
        datasets: [{
          label: 'Total Annonces',
          data: [this.totalAnnonces],
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 1
        },
        {
          label: 'Total Réservations',
          data: [this.totalReservations],
          backgroundColor: 'orange',
          borderColor: 'orange',
          borderWidth: 1
        }],
        labels: ['Annonces', 'Réservations']
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
  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Réservations', 'Autres'],
        datasets: [{
          data: [this.totalReservations, this.totalAnnonces - this.totalReservations],
          backgroundColor: ['#36a2eb', '#ff6384'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw as number;
                const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
  
  

  navigateToFormulaire(): void {
    this.router.navigate(['/formulaire']);
  }
}
