import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PortadaComponent } from './componentes/portada/portada.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { FormacionComponent } from './componentes/formacion/formacion.component';
import { ItemFormacionComponent } from './componentes/item-formacion/item-formacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ItemHabilidadesComponent } from './componentes/item-habilidades/item-habilidades.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { ItemProyectosComponent } from './componentes/item-proyectos/item-proyectos.component';
import { ExperienciaLaboralComponent } from './componentes/experiencia-laboral/experiencia-laboral.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ItemExperienciaComponent } from './componentes/item-experiencia/item-experiencia.component';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortadaComponent,
    AcercaDeComponent,
    FormacionComponent,
    ItemFormacionComponent,
    HabilidadesComponent,
    ItemHabilidadesComponent,
    FooterComponent,
    ContactoComponent,
    ProyectosComponent,
    ItemProyectosComponent,
    ExperienciaLaboralComponent,
    LoginComponent,
    HomeComponent,
    ItemExperienciaComponent
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 30000
      
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
