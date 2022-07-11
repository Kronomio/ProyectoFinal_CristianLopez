import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ValidadorPersonalizado } from '../../utils/validador-personalizado'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  nuevoUsuario: NuevoUsuario = new NuevoUsuario("", "", "", "", ['']);
  

  constructor(private formBuilder: FormBuilder, private autenticationService: AutenticacionService, private router: Router) {
    this.formSignup = this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        password: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required], [ValidadorPersonalizado.validarEmail(this.autenticationService)], 'blur'],
        username: ['', [Validators.required], [ValidadorPersonalizado.validarUsername(this.autenticationService)], 'blur'],
        password2: ['', [Validators.required]],
        estado: ['']

      });
    this.formSignup.get('password2')?.setValidators(ValidadorPersonalizado.confirmacionContraseña(this.formSignup.get('password')));
  }

  ngOnInit(): void {
  }

  onRegistrar(event: Event) {

    if (this.formSignup.valid) {
      this.nuevoUsuario.email = this.formSignup.value["email"];
      this.nuevoUsuario.nombre = this.formSignup.value["nombre"];
      this.nuevoUsuario.password = this.formSignup.value["password"];
      this.nuevoUsuario.username = this.formSignup.value["username"];
      this.nuevoUsuario.roles = ["user"];

      this.autenticationService.nuevo(this.nuevoUsuario).subscribe({
        next: (response: any) => {

          this.formSignup.reset();
          this.router.navigate(['login']);

        },
        error: (error: HttpErrorResponse) => {

          
          console.log(error);
          

          this.formSignup.get("estado")?.setValue("Error en la registración. Verifique los campos marcados");
        }

      });
    }
    else {
      this.formSignup.get("estado")?.setValue("Corrija los campos marcados");
    }
  }
  get Username() { return this.formSignup.get("username"); }
  get Nombre() { return this.formSignup.get("nombre"); }
  get Email() { return this.formSignup.get("email"); }
  get Password() { return this.formSignup.get("password"); }
  get Password2() { return this.formSignup.get("password2"); }
  get Estado() { return this.formSignup.get("estado"); }

}


