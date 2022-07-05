import { HttpErrorResponse } from '@angular/common/http';
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
  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  isUsuarioNoEncontrado = false;
  loginUsuario!: LoginUsuario;
  username!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;



  constructor(private formBuilder: FormBuilder, private autenticacionService: AutenticacionService, private router: Router, private tokenService: TokenService) {
    this.form = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]

      })

  }
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.isUsuarioNoEncontrado = false;
      this.roles = this.tokenService.getAuthorities();

      console.log(this.tokenService.getToken());
    }
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
        this.isLoginFail = false;
        this.isUsuarioNoEncontrado = false;
        this.router.navigate(['home']);
      }, error: (err: HttpErrorResponse) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error;
        console.log(err.error);
        if (err.error == null) {
          this.isUsuarioNoEncontrado = true;
          this.form.reset();
        }


      }
    })
  }
  onSignup(){
    this.router.navigate(['signup'])
  }


}

