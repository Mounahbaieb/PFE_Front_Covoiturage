import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {

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
    private conducteurService:ConducteurService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.annonceId = params['id'];
      this.loadAnnoncesNonAcceptees();
      if (this.annonceId) {
        this.getInvitationDetails(this.annonceId);
      }
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
  getInvitationDetails(annonceId: string): void {
    this.annonce$ = this.annonceService.getAnnonceById(annonceId);
  }

  accepterAnnonce(annonce: Annonce): void {
    annonce.etat = EtatAnnonce.ACCEPTEE;
  
    this.annonceService.updateAnnonce(annonce).subscribe(
      (response) => {
        console.log('Réponse de la mise à jour:', response); // Ajoutez ceci pour vérifier la réponse
        this.snackBar.open('Annonce acceptée avec succès', 'Fermer', { duration: 3000 });
  
        // Enlever l'annonce acceptée de la liste des annonces
        this.annonces = this.annonces.filter(a => a.id !== annonce.id);
        this.datasource.data = this.annonces; // Mettre à jour la data source
  
        // Naviguer vers la liste des annonces acceptées
        this.router.navigateByUrl('/ListAnnonceAccepter');
      },
      error => {
        console.error('Erreur lors de l\'acceptation de l\'annonce :', error);
        this.snackBar.open('Erreur lors de l\'acceptation de l\'annonce', 'Fermer', { duration: 3000 });
      }
    );
  }
  refuserAnnonce(annonce: Annonce): void {
    annonce.etat = EtatAnnonce.REFUSEE;

    this.annonceService.updateAnnonce(annonce).subscribe(
      () => {
        this.snackBar.open('Annonce refusée avec succès', 'Fermer', { duration: 3000 });

        // Enlever l'annonce refusée de la liste des annonces
        this.annonces = this.annonces.filter(a => a.id !== annonce.id);
        this.datasource.data = this.annonces; // Mettre à jour la data source

        // Optionnel: Naviguer vers une autre page ou actualiser la liste des annonces refusées
        // this.router.navigateByUrl('/ListAnnonceRefuser');
      },
      error => {
        console.error('Erreur lors du refus de l\'annonce :', error);
        this.snackBar.open('Erreur lors du refus de l\'annonce', 'Fermer', { duration: 3000 });
      }
    );
  }
}
  
  
