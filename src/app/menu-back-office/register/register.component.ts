import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';
import { ConducteurService } from 'src/Service/conducteur.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
//   conducteur!: FormGroup;

//   constructor(
//     private conducteurService : ConducteurService,
//     private authService: AuthServicesService, 
//     private router: Router, 
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.createForm();
//   }

//   createForm() {
//     this.conducteur = this.fb.group({
//       nom: ['', Validators.required],
//       prenom: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       numDriver: ['', Validators.required],
//       photoDriver: [''],
//       gender: ['', Validators.required],
//     });
//   }

//   submitForm() {
//     if (this.conducteur.valid) {
//       this.conducteurService.createConducteur(this.conducteur.value).subscribe(
//         response => {
//           console.log('Compte créé avec succès', response);
//           this.router.navigate(['/login']);
//         },
//         error => {
//           console.error('Erreur lors de la création du compte', error);
//         }
//       );
//     } else {
//       console.error('Formulaire invalide');
//     }
//   }

//   login(): void {
//     this.router.navigate(['/login']);
//   }
 }
