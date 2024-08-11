// annonces.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { AnnoncesService } from 'src/Service/annonces.service';
import { VoitureService } from 'src/Service/voiture.service';
import { AuthServicesService } from 'src/Service/auth-services.service';

import { Annonce } from 'src/app/model/Annonce';
import { Voiture } from 'src/app/model/Voiture';
import { EtatAnnonce } from 'src/app/model/EtatAnnonce';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  tabAnnonce: Annonce[] = [];
  datasource = new MatTableDataSource<Annonce>();
  voitures: Map<string, Voiture> = new Map<string, Voiture>();
  conducteurId: string | null = null;

  constructor(
    private annonceService: AnnoncesService,
    private voitureService: VoitureService,
    private authService: AuthServicesService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  // annonces.component.ts
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.conducteurId = params.get('conducteurId');
      if (this.conducteurId) {
        console.log('ID du conducteur récupéré:', this.conducteurId); // Affiche l'ID du conducteur dans la console
        this.getAnnoncesByConducteurId(this.conducteurId);
      } else {
        console.warn('ID du conducteur non défini');
      }
    });
  }
  
  getAnnoncesByConducteurId(conducteurId: string): void {
    this.annonceService.getAnnoncesByConducteurId(conducteurId).subscribe(
      (annonces: Annonce[]) => {
        console.log('Annonces récupérées:', annonces);
        this.annonces = annonces;
        this.tabAnnonce = this.annonces;
        this.datasource = new MatTableDataSource<Annonce>(this.annonces);
        this.loadVoituresDetails();
      },
      error => {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    );
  }
  

  getMarque(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.marque ?? 'Non disponible';
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

  deleteAnnonce(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.annonceService.ONDELETE(id).subscribe(() => {
          this.snackBar.open('Annonce supprimée avec succès', 'Fermer', { duration: 3000 });
          if (this.conducteurId) {
            this.getAnnoncesByConducteurId(this.conducteurId);
          }
        }, error => {
          console.error('Erreur lors de la suppression de l\'annonce:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'annonce', 'Fermer', { duration: 3000 });
        });
      }
    });
  }

  onedit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.annonceService.getAnnonceById(id).subscribe((r) => {
      dialogConfig.data = r;
      this.dialog.open(ModalComponent, dialogConfig);
    });
  }

  open(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ModalComponent, dialogConfig);
  }

  getEtatAnnonce(etat: EtatAnnonce): string {
    switch (etat) {
      case EtatAnnonce.EN_COURS:
        return 'En cours';
      case EtatAnnonce.ACCEPTEE:
        return 'Acceptée';
      case EtatAnnonce.REFUSEE:
        return 'Refusée';
      default:
        return 'État inconnu';
    }
  }


  viewReservations(id: string): void {
  this.router.navigate(['/reservations', id]);
}

}
