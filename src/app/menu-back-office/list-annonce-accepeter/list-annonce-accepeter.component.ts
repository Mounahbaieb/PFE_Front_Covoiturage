import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnoncesService } from 'src/Service/annonces.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { VoitureService } from 'src/Service/voiture.service';
import { Annonce } from 'src/app/model/Annonce';
import { Conducteur } from 'src/app/model/Conducteur';
import { Voiture } from 'src/app/model/Voiture';

@Component({
  selector: 'app-list-annonce-accepeter',
  templateUrl: './list-annonce-accepeter.component.html',
  styleUrls: ['./list-annonce-accepeter.component.css']
})
export class ListAnnonceAccepeterComponent implements OnInit {
  annoncesAcceptees: Annonce[] = [];
  datasource = new MatTableDataSource<Annonce>();
  voitures: Map<string, Voiture> = new Map<string, Voiture>();
  conducteurs: Map<string, Conducteur> = new Map<string, Conducteur>();
  annonce$: Observable<Annonce> | undefined;
  annonceId: string | null = null;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private voitureService: VoitureService,
    private conducteurService: ConducteurService,
    private annonceService: AnnoncesService,
  ) { }

  ngOnInit(): void {
    this.loadAnnoncesAcceptees();
  }

  loadAnnoncesAcceptees(): void {
    this.annonceService.getAnnoncesAcceptees().subscribe((data: Annonce[]) => {
      this.annoncesAcceptees = data;
      this.datasource = new MatTableDataSource<Annonce>(this.annoncesAcceptees);
      this.loadConducteursDetails();
      this.loadVoituresDetails();
    });
  }

  getPhotoVoiture(voitureId: string | undefined): string {
    return this.voitures.get(voitureId ?? '')?.photoVoiture ?? 'default-image.jpg';
  }

  loadVoituresDetails(): void {
    const voitureIds = this.annoncesAcceptees.map(a => a.voitureId);
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

  getPhotoConducteur(conducteurId: string | undefined): string {
    return this.conducteurs.get(conducteurId ?? '')?.photoDriver ?? 'default-image.jpg';
  }
  loadConducteursDetails(): void {
    const conducteurIds = this.annoncesAcceptees.map(a => a.conducteurId);
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

}
