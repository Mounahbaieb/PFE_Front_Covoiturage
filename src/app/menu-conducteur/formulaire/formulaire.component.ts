import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnoncesService } from 'src/Service/annonces.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { UploadService } from 'src/Service/upload.service';
import { VoitureService } from 'src/Service/voiture.service';
import { EtatAnnonce } from 'src/app/model/EtatAnnonce';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {
  currentStep = 1;
  rideForm!: FormGroup;
  locations = ['Sfax', 'Sousse', 'Tunis', 'Ariana', 'Bizerte', 'Gabès', 'Kairouan', 'Bizerte', 'Gafsa', 'Monastir', 'La Marsa', 'Ben Arous', 'Hammamet', 'Nabeul', 'Mahdia', 'Kasserine', 'Tozeur', 'Jendouba', 'Zarzis', 'El Kef', 'Gremda', 'Houmt El Souk', 'El Hamma', 'Mateur'];
  driverFiles: File[] = [];
  carFiles: File[] = [];
  imageUrl: string = "";
  conducteurId: string | null = null;

  constructor(
    private route: ActivatedRoute,

    private datePipe: DatePipe,
    private fb: FormBuilder,
    private annonceService: AnnoncesService,
    private voitureService: VoitureService,
    private conducteurService: ConducteurService,
    private upload: UploadService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.route.paramMap.subscribe(params => {
      this.conducteurId = params.get('id');
      if (this.conducteurId) {
        this.loadConducteur(this.conducteurId);
      }
    });
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
  createForm() {
    this.rideForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numDriver: ['', Validators.required],
      photoDriver: [''],
      marque: ['', Validators.required],
      photoVoiture: [''],
      nbrPlaceDispo: ['', Validators.required],
      lieuDeDepart: ['', Validators.required],
      lieuDesti: ['', Validators.required],
      timeDepart: ['', Validators.required],
      dateDepart: ['', Validators.required],
      climatisation: [false],
      gender: ['', Validators.required],
      tarif: ['', Validators.required],
      numSerie: ['', Validators.required],
      bagage: [false],
      fumeur: [false],
    });
  }

  onSelectDriverImage(event: any): void {
    this.driverFiles.push(...event.addedFiles);
    this.uploadDriverImage();
  }

  onRemoveDriverImage(event: any): void {
    this.driverFiles.splice(this.driverFiles.indexOf(event), 1);
  }

  formatDate(date: string): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'MM/dd/yyyy')!;
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

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
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

  setStep(step: number) {
    this.currentStep = step;
  }
  submitForm(): void {
    if (this.rideForm.valid) {
      // Obtenez les données du formulaire
      const formData = this.rideForm.value;
  
      // Formatez la date de départ
      formData.dateDepart = this.formatDate(formData.dateDepart);
  
      // Préparez les données pour la voiture
      const carData = {
        marque: formData.marque,
        numSerie: formData.numSerie,
        photoVoiture: formData.photoVoiture
      };
  
      // Appelez le service pour sauvegarder les informations de la voiture
      this.voitureService.saveCarInfo(carData).subscribe(
        voitureResponse => {
          console.log('Voiture créée avec succès:', voitureResponse);
  
          // Préparez les données pour l'annonce en incluant l'ID du conducteur
          const annonceData = {
            ...formData,
            voitureId: voitureResponse.id,
            conducteurId: this.conducteurId ,// Incluez l'ID du conducteur ici
            etat: EtatAnnonce.EN_COURS // Définir l'état par défaut

          };
  
          // Appelez le service pour créer l'annonce
          this.annonceService.createAnnonce(annonceData).subscribe(
            response => {
              console.log('Annonce créée avec succès:', response);
              // Réinitialisez le formulaire et les fichiers
              this.rideForm.reset();
              this.driverFiles = [];
              this.carFiles = [];
              this.imageUrl = '';
              this.nextStep();
            },
            error => {
              console.error('Erreur lors de la création de l\'annonce:', error);
              console.error('Détails de l\'erreur:', error.error);
            }
          );
        },
        error => {
          console.error('Erreur lors de la création de la voiture:', error);
          console.error('Détails de l\'erreur:', error.error);
          // Ajoutez une gestion d'erreur plus détaillée si nécessaire
          alert('Une erreur est survenue lors de la création de la voiture. Veuillez vérifier les informations et réessayer.');
        }
      );
    } else {
      console.warn('Le formulaire n\'est pas valide.');
      // Vous pouvez ajouter des messages d'erreur ou des alertes pour l'utilisateur
    }
  }
  
}  