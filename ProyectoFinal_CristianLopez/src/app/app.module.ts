import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { LinksComponent } from './componentes/links/links.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortadaComponent,
    AcercaDeComponent,
    LinksComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
