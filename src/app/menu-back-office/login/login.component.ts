import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
//   conducteur!: FormGroup;
//   isAuthenticated = false;

//   constructor(
//     private authService: AuthServicesService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit(): void {
//     this.createForm();
//   }

//   createForm() {
//     this.conducteur = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   signin(): void {
//     if (this.conducteur.valid) {
//       this.authService.login(this.conducteur.value).subscribe(
//         response => {
//           console.log('Compte connecté avec succès', response);
//           this.isAuthenticated = true;
//           this.router.navigate(['/menu-back-office/dashboard']);
//         },
//         error => {
//           console.error('Erreur lors de la connexion du compte', error);
//         }
//       );
//     } else {
//       console.error('Formulaire invalide');
//     }
//   }
//   register(): void {
//     // Appel à une méthode de service d'authentification
//     this.router.navigate(['/register']);
//   }
 }
