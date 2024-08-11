import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor( private router: Router) {}

  signin(): void {
    // Appel à une méthode de service d'authentification
    this.router.navigate(['/recherche']);
  }
}
