import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnoncesService } from 'src/Service/annonces.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { VoitureService } from 'src/Service/voiture.service';
import { Annonce } from 'src/app/model/Annonce';
import { Conducteur } from 'src/app/model/Conducteur';
import { Voiture } from 'src/app/model/Voiture';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  annonces: Annonce[] = [];
  annoncesFiltrees: Annonce[] = [];
  depart: string = '';
  locations = ['Sfax', 'Sousse', 'Tunis', 'Ariana', 'Bizerte', 'Gabès', 'Kairouan', 'Gafsa', 'Monastir', 'La Marsa', 'Ben Arous', 'Hammamet', 'Nabeul', 'Mahdia', 'Kasserine', 'Tozeur', 'Jendouba', 'Zarzis', 'El Kef', 'Gremda', 'Houmt El Souk', 'El Hamma', 'Mateur'];
  destination: string = '';
  dateDepart: string = '';
  nbrPlaces: number | null = null;
  selectedCigarette: boolean = false;
  selectedBaggage: boolean = false;
  selectedClimatisation: boolean = false;
  selectedDate: Date | undefined;
  selectedDeparture: string | undefined;
  selectedArrival: string | undefined;
  before6: boolean = false;
  between6And12: boolean = false;
  between12And18: boolean = false;
  between18And24: boolean = false;
  voitures: Map<string, Voiture> = new Map<string, Voiture>();
  conducteurs: Map<string, Conducteur> = new Map<string, Conducteur>();

  constructor(
    private datePipe: DatePipe,
    private annonceService: AnnoncesService,
    private router: Router,
    private voitureService: VoitureService,
    private conducteurService: ConducteurService
  ) {}

  ngOnInit(): void {
    this.getAnnoncesAcceptees();
  }

  getAnnoncesAcceptees(): void {
    this.annonceService.getAnnoncesAcceptees().subscribe((data: Annonce[]) => {
      this.annonces = data;
      this.annoncesFiltrees = [...this.annonces]; // Initialisation avec toutes les annonces
      this.loadConducteursDetails();
      this.loadVoituresDetails();
    }, error => {
      console.error('Erreur lors de la récupération des annonces acceptées:', error);
    });
  }

  formatDate(date: string): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'yyyy-MM-dd')!;
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
            console.warn(`Conducteur non trouvé pour l'ID ${id}`);
          }
        }, error => {
          console.error(`Erreur lors de la récupération du conducteur avec ID ${id}:`, error);
        });
      } else {
        console.warn(`ID de conducteur invalide: ${id}`);
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

  goToAnnonceDetail(annonceId: string): void {
    this.router.navigate(['/annonceRechercheDetail', annonceId]);
  }

  isBeforeTime(time: string, referenceTime: string): boolean {
    const [timeHours, timeMinutes] = time.split(':').map(Number);
    const [refHours, refMinutes] = referenceTime.split(':').map(Number);
    return timeHours < refHours || (timeHours === refHours && timeMinutes < refMinutes);
  }

  isBetweenTime(time: string, startTime: string, endTime: string): boolean {
    return time >= startTime && time < endTime;
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  rechercher(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.selectedCigarette = false;
    this.selectedBaggage = false;
    this.selectedClimatisation = false;
    this.before6 = false;
    this.between6And12 = false;
    this.between12And18 = false;
    this.between18And24 = false;
    this.dateDepart = '';
    this.nbrPlaces = null;
    this.depart = '';
    this.destination = '';
    this.annoncesFiltrees = [...this.annonces];
  }

  applyFilters(): void {
    this.annoncesFiltrees = this.annonces.filter(annonce => {
      const matchesCigarette = !this.selectedCigarette || annonce.fumeur;
      const matchesBaggage = !this.selectedBaggage || annonce.bagage;
      const matchesClimatisation = !this.selectedClimatisation || annonce.climatisation;
      const matchesDateDepart = !this.dateDepart || annonce.dateDepart === this.dateDepart;
      const matchesNbrPlaces = this.nbrPlaces === null || annonce.nbrPlaceDispo >= this.nbrPlaces;
      const matchesDepart = !this.depart || annonce.lieuDeDepart === this.depart;
      const matchesDestination = !this.destination || annonce.lieuDesti === this.destination;
      
      // Filtrage par heure de départ
      const formattedDepartureTime = annonce.timeDepart ? this.formatTime(annonce.timeDepart) : '';

      const matchesBefore6 = this.before6 ? this.isBeforeTime(formattedDepartureTime, '06:00') : true;
      const matchesBetween6And12 = this.between6And12 ? this.isBetweenTime(formattedDepartureTime, '06:00', '12:00') : true;
      const matchesBetween12And18 = this.between12And18 ? this.isBetweenTime(formattedDepartureTime, '12:00', '18:00') : true;
      const matchesBetween18And24 = this.between18And24 ? this.isBetweenTime(formattedDepartureTime, '18:00', '24:00') : true;

      return matchesCigarette && matchesBaggage && matchesClimatisation &&
             matchesBefore6 && matchesBetween6And12 && matchesBetween12And18 &&
             matchesBetween18And24 && matchesDateDepart && matchesNbrPlaces &&
             matchesDepart && matchesDestination;
    });
  }
}
