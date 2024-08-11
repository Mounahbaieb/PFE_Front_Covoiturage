import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBackOfficeModule } from './menu-back-office/menu-back-office.module';
import { MenuClientModule } from './menu-client/menu-client.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MenuConducteurModule } from './menu-conducteur/menu-conducteur.module';

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule, // Import RouterModule
    AppRoutingModule,
    MenuBackOfficeModule,
MenuClientModule,   
MenuConducteurModule, 
MatButtonModule,MatSelectModule,
FormsModule,MatNativeDateModule,MatIconModule,
BrowserAnimationsModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatDialogModule

  ],
  providers: [DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
