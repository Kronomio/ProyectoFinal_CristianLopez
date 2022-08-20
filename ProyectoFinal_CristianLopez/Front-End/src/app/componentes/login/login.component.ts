import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AsyncValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { TokenService } from 'src/app/services/token.service';
import { ValidadorPersonalizado } from 'src/app/utils/validador-personalizado';
import { __asyncValues } from 'tslib';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  isUsuarioNoEncontrado = false;
  loginUsuario!: LoginUsuario;
  loginInvitado: LoginUsuario=new  LoginUsuario("user", "user");
  username!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  


  constructor(
    private formBuilder: FormBuilder, 
    private autenticacionService: AutenticacionService, 
    private router: Router, 
    private tokenService: TokenService, 
    private mensajeService:NotificacionesService
    ) {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]

      })
      

  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isUsuarioNoEncontrado = false;
      this.roles = this.tokenService.getAuthorities();
     
    }
  
    $('#username').focus();
    
  }

  get Username() { return this.form.get("username"); }
  get Password() { return this.form.get("password"); }

  onEnviar(event: Event) {
    event.preventDefault;
    this.autenticacionService.login(this.form.value).subscribe({
      next: (data: any) => {
        console.log("DATA: " + JSON.stringify(data));
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.isLogged = true;
        this.isUsuarioNoEncontrado = false;
        this.tokenService.getAuthorities()
    if (this.tokenService.getAuthorities().indexOf("ROLE_ADMIN") != -1) {
      window.sessionStorage.setItem('isAdmin', 'true');
    } 
    else 
    { 
      if (this.tokenService.getAuthorities().indexOf("ROLE_COLLABORATOR") != -1) {
        window.sessionStorage.setItem('isCollaborator', 'true');
      } 
      else 
      { 
          
        window.sessionStorage.setItem('isAdmin', 'false');
        window.sessionStorage.setItem('isColabborator', 'false');
        window.sessionStorage.setItem('isUser', 'true');
      }
  }
          this.mensajeService.showSuccess("Sesión iniciada correctamente");
        this.router.navigate(['home']);
      }, error: (err: HttpErrorResponse) => {
        this.isLogged = false;
        
        this.errMsj = err.error;
        this.isUsuarioNoEncontrado=true;
        window.sessionStorage.setItem('isAdmin', 'false');
        window.sessionStorage.setItem('isColabborator', 'false');
        window.sessionStorage.setItem('isUser', 'false');
        
       
        this.mensajeService.showError("Usuario o contraseña inválido");
        
        if (err.error == null) {
          this.isUsuarioNoEncontrado = true;
        this.mensajeService.showError("Usuario no existente");
        window.sessionStorage.setItem('isAdmin', 'false');
        window.sessionStorage.setItem('isColabborator', 'false');
        window.sessionStorage.setItem('isUser', 'false');


          this.form.reset();
        }


      }
    })
  }
 
  onSignup(){
    this.router.navigate(['signup']);
  }


}

