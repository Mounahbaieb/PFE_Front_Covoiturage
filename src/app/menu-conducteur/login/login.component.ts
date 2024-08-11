import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';
import { SousAdminService } from 'src/Service/sous-admin.service'; // Importez votre service de sous-admin

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  conducteur!: FormGroup;

  constructor(
    private authService: AuthServicesService,
    private sousAdminService: SousAdminService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.conducteur = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // signin(): void {
  //   if (this.conducteur.valid) {
  //     const email = this.conducteur.value.email;
  //     const password = this.conducteur.value.password;
  
  //     if (email === "admin@gmail.com" && password === "admin") {
  //       console.log("Connexion réussie en tant qu'admin principal");
  //       this.router.navigate(['/menu-back-office/dashboard']);
  //     } else  {
  //       this.sousAdminService.login({ email, password }).subscribe(
  //         response => {
  //           console.log('Connexion réussie', response);
  
  //           if (email === 'sousadmin@example.com') {
  //             this.router.navigate(['/menu-back-office/dashboard']);
  //           } else {
  //             this.router.navigate(['/menu-back-office/dashboard']);
  //           }
  //         },
  //         error => {
  //           console.error('Erreur lors de la connexion', error);
  //         }
  //       );
  //     }
  //   } else {
  //     console.error('Formulaire invalide');
  //   }
  // }
  signin(): void {
    if (this.conducteur.valid) {
      const email = this.conducteur.value.email;
      const password = this.conducteur.value.password;
  
      // Vérifier si l'utilisateur est un admin principal
      if (email === "admin@gmail.com" && password === "admin") {
        console.log("Connexion réussie en tant qu'admin principal");
        localStorage.setItem('email', email);

        this.router.navigate([`/menu-back-office/dashboard`]);
      } else {
        // Vérifier si l'utilisateur est un sous-admin
        this.sousAdminService.login({ email, password }).subscribe(
          response => {
            console.log('Connexion réussie', response);
            if (email === 'sousadmin@example.com') {
              this.router.navigate(['/menu-back-office/dashboard']);
            } else {
              localStorage.setItem('email', email);

              this.router.navigate(['/menu-back-office/dashboard']);
            }
          },
          error => {
            console.error('Erreur lors de la connexion', error);
  
            // Si l'authentification en tant que sous-admin échoue, tenter la connexion en tant que conducteur
            this.authService.login(this.conducteur.value).subscribe(
              response => {
                console.log('Compte connecté avec succès', response);
                const conducteurId = response.id;  // Assurez-vous que `response` contient l'ID
                // Stockez l'ID du conducteur et l'email dans le localStorage
    localStorage.setItem('conducteurId', conducteurId);
    localStorage.setItem('email', email);
                this.router.navigate(['/dashboard']);
              },
              error => {
                console.error('Erreur lors de la connexion du compte', error);
              }
            );
          }
        );
      }
    } else {
      console.error('Formulaire invalide');
    }
  }
  
  register(): void {
    this.router.navigate(['/register']);
  }
}
