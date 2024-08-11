import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnnoncesService } from 'src/Service/annonces.service';
import { AuthServicesService } from 'src/Service/auth-services.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { UploadService } from 'src/Service/upload.service';
import { VoitureService } from 'src/Service/voiture.service';
import { EtatAnnonce } from 'src/app/model/EtatAnnonce';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  conducteurId: string | null = null;
  voitureId: string | null = null;
  currentStep = 1;
  rideForm!: FormGroup;
  locations = ['Sfax', 'Sousse', 'Tunis', 'Ariana', 'Bizerte', 'Gabès', 'Kairouan', 'Gafsa', 'Monastir', 'La Marsa', 'Ben Arous', 'Hammamet', 'Nabeul', 'Mahdia', 'Kasserine', 'Tozeur', 'Jendouba', 'Zarzis', 'El Kef', 'Gremda', 'Houmt El Souk', 'El Hamma', 'Mateur'];
  driverFiles: File[] = [];
  carFiles: File[] = [];
  imageUrl: string = "";
  verifEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService : AuthServicesService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    private annonceService: AnnoncesService,
    private upload: UploadService,
    private datePipe: DatePipe,
    private conducteurService: ConducteurService,
    private voitureService: VoitureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("Data received: ", this.data);

    if (this.data) {
      this.verifEdit = true;
      this.initForm2();
      this.conducteurId = this.data.conducteurId;
      this.voitureId = this.data.voitureId;


      if (this.conducteurId) {
        this.loadConducteur(this.conducteurId);
      } else {
        console.error('conducteurId is null or undefined');
      }

      if (this.voitureId) {
        this.loadVoiture(this.voitureId);
      } else {
        console.error('voitureId is null or undefined');
      }
    }
  }

  loadConducteur(id: string) {
    this.conducteurService.getConducteurById(id).subscribe(
      conducteur => {
        console.log('Conducteur récupéré:', conducteur);
        this.rideForm.patchValue({
          nom: conducteur.nom,
          prenom: conducteur.prenom,
          numDriver: conducteur.numDriver,
          photoDriver: conducteur.photoDriver,
          gender: conducteur.gender
        });
      },
      error => {
        console.error('Erreur lors de la récupération du conducteur:', error);
      }
    );
  }

  loadVoiture(id: string) {
    this.voitureService.getVoitureById(id).subscribe(
      voiture => {
        console.log('Voiture récupérée:', voiture);
        this.rideForm.patchValue({
          marque: voiture.marque,
          numSerie: voiture.numSerie,
          photoVoiture: voiture.photoVoiture
        });
      },
      error => {
        console.error('Erreur lors de la récupération de la voiture:', error);
      }
    );
  }

  formatDate(date: string): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'MM/dd/yyyy')!;
  }

  close(): void {
    this.dialogRef.close();
  }

  initForm2(): void {
    this.rideForm = new FormGroup({
      nom: new FormControl(this.data?.nom),
      prenom: new FormControl(this.data?.prenom),
      numDriver: new FormControl(this.data?.numDriver),
      photoDriver: new FormControl(this.data?.photoDriver),
      gender: new FormControl(this.data?.gender),
      marque: new FormControl(this.data?.marque),
      photoVoiture: new FormControl(this.data?.photoVoiture),
      nbrPlaceDispo: new FormControl(this.data?.nbrPlaceDispo, [Validators.required]),
      lieuDeDepart: new FormControl(this.data?.lieuDeDepart, [Validators.required]),
      lieuDesti: new FormControl(this.data?.lieuDesti, [Validators.required]),
      dateDepart: new FormControl(this.formatDate(this.data?.dateDepart), [Validators.required]),
      timeDepart: new FormControl(this.data?.timeDepart, [Validators.required]),
      climatisation: new FormControl(this.data?.climatisation),
      tarif: new FormControl(this.data?.tarif, [Validators.required]),
      numSerie: new FormControl(this.data?.numSerie, [Validators.required]),
      bagage: new FormControl(this.data?.bagage),
      fumeur: new FormControl(this.data?.fumeur),
      etat: new FormControl(this.data?.etat)  // Définir l'état par défaut

    });
  }

  confirm(): void {
    const formattedDate = this.datePipe.transform(this.rideForm.value.dateDepart, 'yyyy-MM-dd');
    const formData = {
      ...this.rideForm.value,
      dateDepart: formattedDate,
      etat: this.rideForm.value.etat 
    };
  
    if (!this.verifEdit) {
      // Création d'une nouvelle annonce
      this.annonceService.createAnnonce(formData).subscribe(() => {
        this.redirectToForm();
      });
    } else {
      // Mise à jour de l'annonce
      this.annonceService.edit(formData, this.data?.id).subscribe(() => {
        // Mise à jour du conducteur
        if (this.conducteurId) {
          const conducteurData = {
            nom: this.rideForm.value.nom,
            prenom: this.rideForm.value.prenom,
            numDriver: this.rideForm.value.numDriver,
            photoDriver: this.rideForm.value.photoDriver,
            gender: this.rideForm.value.gender
          };
          this.conducteurService.editConducteur(conducteurData, this.conducteurId).subscribe(() => {
            // Mise à jour de la voiture
            if (this.voitureId) {
              const voitureData = {
                marque: this.rideForm.value.marque,
                numSerie: this.rideForm.value.numSerie,
                photoVoiture: this.rideForm.value.photoVoiture
              };
              this.voitureService.editVoiture(voitureData, this.voitureId).subscribe(() => {
                this.redirectToForm();
              });
            } else {
              this.redirectToForm();
            }
          });
        } else if (this.voitureId) {
          // Mise à jour de la voiture seulement si conducteurId n'est pas défini
          const voitureData = {
            marque: this.rideForm.value.marque,
            numSerie: this.rideForm.value.numSerie,
            photoVoiture: this.rideForm.value.photoVoiture
          };
          this.voitureService.editVoiture(voitureData, this.voitureId).subscribe(() => {
            this.redirectToForm();
          });
        } else {
          this.redirectToForm();
        }
      });
    }
    this.dialogRef.close(this.rideForm.value);
  }

    redirectToForm(): void {
    const conducteurId = this.authService.getConducteurId();
    if (conducteurId) {
      this.router.navigate([`/conducteurs/${conducteurId}`]);
    } else {
      console.warn('ID du conducteur non défini');
    }
  }

  
  
  onSelectDriverImage(event: any): void {
    this.driverFiles.push(...event.addedFiles);
    this.uploadDriverImage();
  }

  onRemoveDriverImage(event: any): void {
    this.driverFiles.splice(this.driverFiles.indexOf(event), 1);
  }

  uploadDriverImage(): void {
    if (!this.driverFiles[0]) {
      alert("Please upload an image.");
      return;
    }
    const file_data = this.driverFiles[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'laravel');
    data.append('cloud_name', 'dojutziz3');
    this.upload.uploadImage(data).subscribe((res: any) => {
      this.imageUrl = res.url;
      this.rideForm.patchValue({ photoDriver: res.url });
    });
  }

  onSelectCarImage(event: any): void {
    this.carFiles.push(...event.addedFiles);
    this.uploadCarImage();
  }

  onRemoveCarImage(event: any): void {
    this.carFiles.splice(this.carFiles.indexOf(event), 1);
  }

  uploadCarImage(): void {
    if (!this.carFiles[0]) {
      alert("Please upload an image.");
      return;
    }
    const file_data = this.carFiles[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'laravel');
    data.append('cloud_name', 'dojutziz3');
    this.upload.uploadImage(data).subscribe((res: any) => {
      this.imageUrl = res.url;
      this.rideForm.patchValue({ photoVoiture: res.url });
    });
  }

  goToStep(stepNumber: number): void {
    this.currentStep = stepNumber;
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToNextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  setStep(step: number) {
    this.currentStep = step;
  }
}
