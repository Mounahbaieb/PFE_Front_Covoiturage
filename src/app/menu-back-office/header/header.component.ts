import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/Service/auth-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  email: string | null = '';

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }
  // constructor(private authService: AuthServicesService, private router: Router, ) {}
  // searchText: string = '';


  
  // isLoggedIn(): boolean {
  //   return this.authService.checkAuth(); // Vérifie l'état d'authentification
  // }

  // logout(): void {
  //   this.router.navigateByUrl('/login').then(()=>{
  //     location.reload()
  //   })
  //   // Ajoutez ici votre logique de déconnexion (par exemple, nettoyage de tokens, etc.)
  //   // Redirection vers la page de login
    
  // }
}
