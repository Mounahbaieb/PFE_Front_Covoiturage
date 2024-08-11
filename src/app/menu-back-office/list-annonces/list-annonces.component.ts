import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnnoncesService } from 'src/Service/annonces.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { VoitureService } from 'src/Service/voiture.service';
import { Annonce } from 'src/app/model/Annonce';
import { Conducteur } from 'src/app/model/Conducteur';
import { Voiture } from 'src/app/model/Voiture';

@Component({
  selector: 'app-list-annonces',
  templateUrl: './list-annonces.component.html',
  styleUrls: ['./list-annonces.component.css']
})
export class ListAnnoncesComponent implements OnInit {
  currentDate: Date = new Date();
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: number[][] = [];
  annonces: Annonce[] = [];
  tabannonces: Annonce[] = [];
  searchText: string = '';
  voitures: Map<string, Voiture> = new Map<string, Voiture>(); // Stockage des détails des voitures
  conducteurs: Map<string, Conducteur> = new Map<string, Conducteur>(); // Stockage des détails des voitures


  datasource = new MatTableDataSource<Annonce>();

  constructor(
    private annonceService: AnnoncesService,
    private router: Router,
    private dialog: MatDialog,
    private voitureService:VoitureService,
    private conducteurService:ConducteurService
  ) {}

  ngOnInit(): void {
    this.loadAnnoncesNonAcceptees();
    this.generateCalendar();
   
  }

  getPhotoConducteur(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.photoDriver ?? 'default-image.jpg';
  }
  loadConducteursDetails(): void {
    const conducteurIds = this.annonces.map(a => a.conducteurId);
    conducteurIds.forEach(id => {
      if (id) {
        this.conducteurService.getConducteurById(id).subscribe(conducteur => {
          if (conducteur) {
            this.conducteurs.set(id, conducteur);
          } else {
            console.warn(`Voiture non trouvée pour l'ID ${id}`);
          }
        }, error => {
          console.error(`Erreur lors de la récupération de la voiture avec ID ${id}:`, error);
        });
      } else {
        console.warn(`ID de voiture invalide: ${id}`);
      }
    });
  }


  getPhotoVoiture(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.photoVoiture ?? 'default-image.jpg';
  }
  loadVoituresDetails(): void {
    const voitureIds = this.annonces.map(a => a.voitureId);
    voitureIds.forEach(id => {
      if (id) {
        this.voitureService.getVoitureById(id).subscribe(voiture => {
          if (voiture) {
            this.voitures.set(id, voiture);
          } else {
            console.warn(`Voiture non trouvée pour l'ID ${id}`);
          }
        }, error => {
          console.error(`Erreur lors de la récupération de la voiture avec ID ${id}:`, error);
        });
      } else {
        console.warn(`ID de voiture invalide: ${id}`);
      }
    });
  }




 
  loadAnnoncesNonAcceptees(): void {
    this.annonceService.getAnnoncesNonAcceptees().subscribe((data: Annonce[]) => {
      console.log('Annonces non acceptées reçues:', data);
      this.annonces = data; // Filtrer les annonces avec etat = EN_COURS
      this.datasource = new MatTableDataSource<Annonce>(this.annonces);
      this.loadConducteursDetails();
      this.loadVoituresDetails();
    }, error => {
      console.error('Erreur lors de la récupération des annonces non acceptées:', error);
    });
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

  goToAnnonceDetail(annonceId: string): void {
    this.router.navigate(['/annonceDetail', annonceId]);
  }

  
}


