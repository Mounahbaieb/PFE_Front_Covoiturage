import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';

@Component({
  selector: 'app-menu-conducteur',
  templateUrl: './menu-conducteur.component.html',
  styleUrls: ['./menu-conducteur.component.css']
})
export class MenuConducteurComponent {
  constructor(private authService: AuthServicesService, private router: Router) {}

  isLoggedIn(): boolean {
    
     return this.authService.checkAuth(); // Vérifie l'état d'authentification
  }
  isLoginPage(): boolean {
    return this.router.url === '/login'; // Vérifie si l'utilisateur est sur la page de connexion
  }
}
