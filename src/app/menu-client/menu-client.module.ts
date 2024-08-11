import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuClientComponent } from './menu-client.component';
import { AboutComponent } from './about/about.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FeatureComponent } from './feature/feature.component';
import { FooterComponent } from './footer/footer.component';
import { InfosComponent } from './infos/infos.component';
import { LayoutComponent } from './layout/layout.component';
import { PlusInfoComponent } from './plus-info/plus-info.component';
import { RouterModule } from '@angular/router';
import { RechercheComponent } from './recherche/recherche.component';
import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DetailAnnonceRechercheComponent } from './detail-annonce-recherche/detail-annonce-recherche.component';
import { ModalPassagerComponent } from './modal-passager/modal-passager.component';


@NgModule({
  declarations: [
    MenuClientComponent,
    AboutComponent,
    AccueilComponent,
    FeatureComponent,
    FooterComponent,
    InfosComponent,
    LayoutComponent,
    PlusInfoComponent,
    RechercheComponent,
    DetailsAnnonceComponent,
    DetailAnnonceRechercheComponent,
    ModalPassagerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgxDropzoneModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '', 
        component: MenuClientComponent, 
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: AccueilComponent },
          { path: 'about', component: AboutComponent },
          { path: 'info', component: InfosComponent },
          { path: 'features', component: FeatureComponent },
          { path: 'ReservationPassager', component: ModalPassagerComponent },
          { path: 'plusinfo', component: PlusInfoComponent },
          { path: 'recherche', component: RechercheComponent },
          {path:"annonceRechercheDetail/:id",component:DetailAnnonceRechercheComponent},

        ]
      }
    ])
  ]
})
export class MenuClientModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MenuClientComponent } from './menu-client.component';
// import { AboutComponent } from './about/about.component';
// import { AccueilComponent } from './accueil/accueil.component';
// import { FeatureComponent } from './feature/feature.component';
// import { FooterComponent } from './footer/footer.component';
// import { InfosComponent } from './infos/infos.component';
// import { LayoutComponent } from './layout/layout.component';
// import { PlusInfoComponent } from './plus-info/plus-info.component';
// import { RouterModule } from '@angular/router';
// import { RechercheComponent } from './recherche/recherche.component';
// import { DetailsAnnonceComponent } from './details-annonce/details-annonce.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { AppRoutingModule } from '../app-routing.module';
// import { FormsModule } from '@angular/forms';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule } from '@angular/material/dialog';



// @NgModule({
//   declarations: [
//     MenuClientComponent,
//     AboutComponent,
//     AccueilComponent,
//     FeatureComponent,
//     FooterComponent,
//     InfosComponent,
//     LayoutComponent,
//     PlusInfoComponent,
//     RechercheComponent,
//     DetailsAnnonceComponent
//   ],
//   imports: [
//     CommonModule,MatButtonModule,MatSelectModule, MatIconModule,

    

//     AppRoutingModule,FormsModule,MatNativeDateModule,MatIconModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatDialogModule   ,
//     RouterModule.forChild([
//       {path:'',component: MenuClientComponent, children:[
//       {path:'', redirectTo: 'home', pathMatch: 'full'},
//       {path: 'home', component: AccueilComponent},
//       {path: 'menu-client/about', component: AboutComponent},
//       {path:'menu-client/info',component:InfosComponent},
//       {path:'menu-client/features',component:FeatureComponent},
//       {path:'menu-client/plusinfo',component:PlusInfoComponent},
//       { path: 'menu-client/recherche', component: RechercheComponent },

      
//       ]}
//   ])
//   ]
// })
// export class MenuClientModule { }
