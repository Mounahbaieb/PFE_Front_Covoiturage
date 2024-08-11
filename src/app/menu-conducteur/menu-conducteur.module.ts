import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { MenuConducteurComponent } from './menu-conducteur.component';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalComponent } from './modal/modal.component'; // Importez MatSnackBarModule
import { RegisterComponent } from './register/register.component';
import { ReservationsComponent } from './reservations/reservations.component';



@NgModule({
  declarations: [
    FormulaireComponent,
    MenuConducteurComponent,
    HeaderComponent,
    AnnoncesComponent,
    ConfirmDialogComponent,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    ReservationsComponent,
  ],
  imports: [
    CommonModule,    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgxDropzoneModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild([

      {path:'',component: MenuConducteurComponent, children:[
        { path: 'annonces', component: AnnoncesComponent },
        {path: 'login', component: LoginComponent},
      // {path:"header",component:HeaderComponent},
      {path:'conducteurs/:id',component:FormulaireComponent},
      {path:"dashboard",component:DashbordComponent},
       {path:"register",component:RegisterComponent},
       { path: 'reservations/:id', component: ReservationsComponent },



    ]}
  ])

  ]
  
})
export class MenuConducteurModule { }
