import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

// importation de DATE
import * as fr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { VenteComponent } from './admin-page/vente/vente.component';
import { InscriptionComponent } from './demo/pages/authentication/login/inscription/inscription.component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [InscriptionComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppComponent, 
    VenteComponent,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    
    { provide: LOCALE_ID, useValue: 'fr-FR',  },
    // provideCharts(withDefaultRegisterables())
  ],
})
export class AppModule { 
  // CommandeTableComponent: any
  constructor() {
    registerLocaleData(fr.default);
  }
}
