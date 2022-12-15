import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ChangePasswordUsuario } from 'src/app/model/change-password';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ValidadorPersonalizado } from 'src/app/utils/validador-personalizado';
import { TokenService } from 'src/app/services/token.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword: UntypedFormGroup;
  user!: ChangePasswordUsuario;
  constructor(private formBuilder: UntypedFormBuilder,
    private autenticationService: AutenticacionService,
    private mensajeService: NotificacionesService,
    private tokenService: TokenService,
    private router: Router) {
    this.formChangePassword = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        newPassword2: ['', [Validators.required]]

      });
    this.formChangePassword.get('newPassword2')?.setValidators(ValidadorPersonalizado.confirmacionContraseña(this.formChangePassword.get('newPassword')));

  }

  ngOnInit(): void {

    $('#oldPassword').focus();

  }
  get OldPassword() { return this.formChangePassword.get("oldPassword"); }
  get NewPassword() { return this.formChangePassword.get("newPassword"); }
  get NewPassword2() { return this.formChangePassword.get("newPassword2"); }

  updatePassword(event: Event) {

    this.user = new ChangePasswordUsuario(this.tokenService.getUsername(), this.OldPassword?.value, this.NewPassword?.value)

    this.autenticationService.updatePassword(this.user).subscribe({
      next: (data: any) => {
        this.mensajeService.showSuccess("Se actualizó la contraseña correctamente");

        $("#cancelar").click();

      }, error: (err: HttpErrorResponse) => {

        this.mensajeService.showError("Contraseña Incorrecta");
      }
    })
  }
}
