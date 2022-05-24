import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { LinksComponent } from './componentes/links/links.component';
import { FormacionComponent } from './componentes/formacion/formacion.component';
import { ItemFormacionComponent } from './componentes/item-formacion/item-formacion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortadaComponent,
    AcercaDeComponent,
    LinksComponent,
    FormacionComponent,
    ItemFormacionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
