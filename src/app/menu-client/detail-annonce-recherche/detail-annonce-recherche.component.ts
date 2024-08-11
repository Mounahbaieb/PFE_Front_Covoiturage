import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnoncesService } from 'src/Service/annonces.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { VoitureService } from 'src/Service/voiture.service';
import { Annonce } from 'src/app/model/Annonce';
import { Conducteur } from 'src/app/model/Conducteur';
import { EtatAnnonce } from 'src/app/model/EtatAnnonce';
import { Voiture } from 'src/app/model/Voiture';
import { ModalPassagerComponent } from '../modal-passager/modal-passager.component';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationsService } from 'src/Service/reservations.service';
@Component({
  selector: 'app-detail-annonce-recherche',
  templateUrl: './detail-annonce-recherche.component.html',
  styleUrls: ['./detail-annonce-recherche.component.css']
})
export class DetailAnnonceRechercheComponent {
  annonces: Annonce[] = [];
  voitures: Map<string, Voiture> = new Map<string, Voiture>(); // Stockage des détails des voitures
  conducteurs: Map<string, Conducteur> = new Map<string, Conducteur>(); // Stockage des détails des voitures
  currentDate: Date = new Date();
  annonce$: Observable<Annonce> | undefined;
  annonceId: string | null = null;
  datasource = new MatTableDataSource<Annonce>();

  constructor(
    private annonceService: AnnoncesService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private voitureService:VoitureService,
    private conducteurService:ConducteurService,
    private reservationService :ReservationsService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.annonceId = params['id'];
      this.getAnnoncesAcceptees();
      if (this.annonceId) {
        this.getInvitationDetails(this.annonceId);
      }
    });
  }

  getAnnoncesAcceptees(): void {
    this.annonceService.getAnnoncesAcceptees().subscribe((data: Annonce[]) => {
      this.annonces = data;
      this.loadConducteursDetails();
      this.loadVoituresDetails();
    }, error => {
      console.error('Erreur lors de la récupération des annonces acceptées:', error);
    });
  }



  
  getPhotoVoiture(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.photoVoiture ?? 'default-image.jpg';
  }
  getMarque(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.marque ?? 'Non disponible';
  }
  getSerie(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.numSerie ?? 'Non disponible';
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
  getnom(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.nom ?? 'Non disponible';
  }
  getprenom(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.prenom ?? 'Non disponible';
  }
  getgender(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.gender ?? 'Non disponible';
  }
  getnumdriver(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.numDriver ?? 'Non disponible';
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
  
  openNavigateReservation(annonceId: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { annonceId };
  
    this.dialog.open(ModalPassagerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        const statut = 'ACCEPTER'; // ou une autre valeur par défaut ou calculée
        this.createReservation(result, annonceId, statut);
      }
    });
  }
  

  createReservation(passager: any, annonceId: string, statut: string): void {
    const reservation: Reservation = {
      annonceId: annonceId,
      passagerId: passager.id,
      statut: statut
    };
  


    // Code pour envoyer cette réservation à votre backend
    this.reservationService.createReservation(reservation).subscribe(
      () => {
        this.snackBar.open('Votre réservation a été effectuée avec succès', 'Fermer', {
          duration: 3000
        });     
    }, error => {
      
      console.error('Erreur lors de la création de la réservation', error);
    });
  }
  

  navigateBack(): void {
    this.router.navigate(['/recherche']); 
  }


  getInvitationDetails(annonceId: string): void {
    this.annonce$ = this.annonceService.getAnnonceById(annonceId);
  }

  





  
}
  
  

