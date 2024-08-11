import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Administrateur } from 'src/app/model/Administrateur';
import { SousAdminService } from 'src/Service/sous-admin.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalSousAdminComponent } from '../modal-sous-admin/modal-sous-admin.component';

@Component({
  selector: 'app-list-sous-admin',
  templateUrl: './list-sous-admin.component.html',
  styleUrls: ['./list-sous-admin.component.css']
})
export class ListSousAdminComponent implements OnInit {
  administrateurs: Administrateur[] = [];

  constructor(private SousAdminService: SousAdminService,   private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.SousAdminService.getSousAdmins().subscribe(
      (data: Administrateur[]) => {
        this.administrateurs = data;
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
    this.dialog.open(ModalSousAdminComponent, dialogConfig);
  }
  deleteAdministrateur(id: string): void {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        height: '200px',
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.SousAdminService.deletSousAdmin(id).subscribe(() => {
            this.snackBar.open('Annonce supprimée avec succès', 'Fermer', { duration: 3000 });
            location.reload()

          }, error => {
            console.error('Erreur lors de la suppression de l\'conducteur:', error);
          });
        }
      });
    }
    editAdministrateur(id: string): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.SousAdminService.getSousAdminById(id).subscribe((r) => {
        dialogConfig.data = r;
        this.dialog.open(ModalSousAdminComponent, dialogConfig);
      });
    }
  
  }
  
