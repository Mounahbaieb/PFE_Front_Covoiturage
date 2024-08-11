// reservations.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnoncesService } from 'src/Service/annonces.service';
import { PassagerService } from 'src/Service/passager.service';
import { ReservationsService } from 'src/Service/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  annonceId: number | null = null;
  passagers: Map<number, any> = new Map(); // Stocker les détails des passagers

  constructor(
    private reservationservice: ReservationsService,
    private route: ActivatedRoute,
    private passagerService: PassagerService, // Ajouter le service des passagers

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.annonceId = +params.get('id')!;
      if (this.annonceId) {
        this.getReservations(this.annonceId);
      }
    });
  }

  getReservations(annonceId: number): void {
    this.reservationservice.getReservationsByAnnonceId(annonceId).subscribe(
      (reservations: any[]) => {
        this.reservations = reservations;
        this.loadPassagersDetails(reservations);

      },
      error => {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    );
  }
  loadPassagersDetails(reservations: any[]): void {
    reservations.forEach(reservation => {
      this.passagerService.getPassagerById(reservation.passagerId).subscribe(passager => {
        this.passagers.set(passager.id, passager);
      }, error => {
        console.error(`Erreur lors de la récupération du passager avec ID ${reservation.passagerId}:`, error);
      });
    });
  }

  getPassagerDetails(passagerId: number): any {
    return this.passagers.get(passagerId);
  }
}
