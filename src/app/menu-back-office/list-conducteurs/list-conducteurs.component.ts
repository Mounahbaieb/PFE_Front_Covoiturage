import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConducteurService } from 'src/Service/conducteur.service';
import { ConfirmDialogComponent } from 'src/app/menu-conducteur/confirm-dialog/confirm-dialog.component';
import { Conducteur } from 'src/app/model/Conducteur';
import { ModalConducteurComponent } from '../modal-conducteur/modal-conducteur.component';

@Component({
  selector: 'app-list-conducteurs',
  templateUrl: './list-conducteurs.component.html',
  styleUrls: ['./list-conducteurs.component.css']
})
export class ListConducteursComponent implements OnInit {

  conducteurs: Conducteur[] = [];

  constructor(private conducteurService: ConducteurService,   private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.conducteurService.getConducteurs().subscribe(
      (data: Conducteur[]) => {
        this.conducteurs = data;
      },
      error => {
        console.error('Erreur lors de la récupération des conducteurs', error);
      }
    );
  }
  open(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ModalConducteurComponent, dialogConfig);
  }
    deleteConducteur(id: string): void {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        height: '200px',
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.conducteurService.deleteConducteur(id).subscribe(() => {
            this.snackBar.open('Annonce supprimée avec succès', 'Fermer', { duration: 3000 });
            location.reload()

          }, error => {
            console.error('Erreur lors de la suppression de l\'conducteur:', error);
          });
        }
      });
    }
    editConducteur(id: string): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.conducteurService.getConducteurById(id).subscribe((r) => {
        dialogConfig.data = r;
        this.dialog.open(ModalConducteurComponent, dialogConfig);
      });
    }
  
  }
  
