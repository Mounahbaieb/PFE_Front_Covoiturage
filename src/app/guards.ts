import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServicesService } from '../Service/auth-services.service'; // Assurez-vous d'importer correctement le service

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServicesService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.checkAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
