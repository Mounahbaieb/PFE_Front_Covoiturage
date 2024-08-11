import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { MenuBackOfficeComponent } from './menu-back-office/menu-back-office.component';
import { RechercheComponent } from './menu-client/recherche/recherche.component';

const routes: Routes = [
  {
    path: '', 
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'menu-client', pathMatch: 'full' },
      { path: 'menu-back-office', loadChildren: () => import('./menu-back-office/menu-back-office.module').then(m => m.MenuBackOfficeModule) },
      { path: 'menu-client', loadChildren: () => import('./menu-client/menu-client.module').then(m => m.MenuClientModule) },
      { path: 'menu-conducteur', loadChildren: () => import('./menu-conducteur/menu-conducteur.module').then(m => m.MenuConducteurModule) },


    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
