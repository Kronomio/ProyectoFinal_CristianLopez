import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  username!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;


  //form= FormGroup;
  constructor( private autenticacionService: AutenticacionService, private router: Router, private tokenService: TokenService) {
    // this.form = this.formBuilder.group(
    //   {
    //     username: ['', [Validators.required]],
    //     password: ['', [Validators.required, Validators.minLength(8)]]
        
    //     })

      }
    
    
  

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();

      console.log(this.tokenService.getToken());
    }
  }

  // get Email() { return this.form.get("email"); }
  // get Password() { return this.form.get("password"); }

  // onEnviar(event:Event)
  // {
  //   event.preventDefault;
  //   this.autenticacionService.iniciarSesion(this.form.value).subscribe(data =>{
  //     console.log("DATA: "+JSON.stringify(data));
  //     this.ruta.navigate(['/home']);
  //   })
  // }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    //console.log(this.loginUsuario);
    this.autenticacionService.login(this.loginUsuario).subscribe(data => {
      // console.log(data);
      // console.log(data.username);
      // console.log(data.token);
      // console.log(data.authorities);
      
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['home']);
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMsj = err
      
    })
  }
}

