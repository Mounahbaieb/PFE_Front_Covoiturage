import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { UploadService } from 'src/Service/upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  conducteur!: FormGroup;
  driverFiles: File[] = [];
  imageUrl: string = "";

  constructor(
    private conducteurService : ConducteurService,
    private upload: UploadService,
    private authService: AuthServicesService, 
    private router: Router, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.conducteur = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      numDriver: ['', Validators.required],
      photoDriver: [''],
      gender: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.conducteur.valid) {
      this.conducteurService.createConducteur(this.conducteur.value).subscribe(
        response => {
          console.log('Compte créé avec succès', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erreur lors de la création du compte', error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }

  login(): void {
    this.router.navigate(['/login']);
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
      this.conducteur.patchValue({ photoDriver: res.url });
    });
  }

}
