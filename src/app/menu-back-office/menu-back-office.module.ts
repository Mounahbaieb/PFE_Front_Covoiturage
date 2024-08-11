import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MenuBackOfficeComponent } from './menu-back-office.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RegisterComponent } from './register/register.component';
import { ListAnnoncesComponent } from './list-annonces/list-annonces.component';
import { AnnonceDetailComponent } from './annonce-detail/annonce-detail.component';
import { ListAnnonceAccepeterComponent } from './list-annonce-accepeter/list-annonce-accepeter.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importez MatSnackBarModule
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListConducteursComponent } from './list-conducteurs/list-conducteurs.component';
import { ModalConducteurComponent } from './modal-conducteur/modal-conducteur.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ListSousAdminComponent } from './list-sous-admin/list-sous-admin.component';
import { ModalSousAdminComponent } from './modal-sous-admin/modal-sous-admin.component';


@NgModule({
  declarations: [
    MenuBackOfficeComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    ListAnnoncesComponent,
    // RegisterComponent,
    AnnonceDetailComponent,
    ListAnnonceAccepeterComponent,
    ListConducteursComponent,
    ModalConducteurComponent,
    ListSousAdminComponent,
    ModalSousAdminComponent
    // LoginComponent

  ],
  imports: [
    CommonModule,    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild([
      {path:'',component: MenuBackOfficeComponent, children:[
      {path:'', redirectTo: 'hello', pathMatch: 'full'},
      {path: 'hello', component: DashbordComponent},
      // {path : 'login',component:LoginComponent},
       {path:"header",component:HeaderComponent},
      // {path:"register",component:RegisterComponent},
      {path:"InvitationsAnnonces",component:ListAnnoncesComponent},
      {path:"annonceDetail/:id",component:AnnonceDetailComponent},
      {path:"ListAnnonceAccepter",component:ListAnnonceAccepeterComponent},

      {path:"ListConducteur",component:ListConducteursComponent},
      {path:"ListSousAdmin",component:ListSousAdminComponent},

      
      {path:"menu-back-office/dashboard",component:DashbordComponent}
      
      ]}
  ])

  ]
  
})
export class MenuBackOfficeModule { }
