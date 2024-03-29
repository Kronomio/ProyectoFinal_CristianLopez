import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ControlAccesoGuard } from './guards/control-acceso.guard';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent},
   {path:'administrarUsuarios', component: UsuariosComponent, canActivate: [ControlAccesoGuard]}
    
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
