import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Estudio } from 'src/app/model/estudio.model';
import { FormacionService } from 'src/app/services/formacion.service';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  public estudios: Estudio[] = [];
  // public editEstudio: Estudio | undefined;
  public borrarEstudio: Estudio | undefined;
  isAdmin = false;
  authorities: string[] = [];
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  formFormacion: FormGroup;
  modo: string = '';
  titleForm: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private formacionService: FormacionService,
    private tokenService: TokenService,
    private mensajeService: NotificacionesService) {
    this.formFormacion = this.formBuilder.group(
      {
        idEst: [],
        titulo: ['', [Validators.required]],
        descripcion: ['', [Validators.maxLength(250)]],
        fecha: ['', [Validators.min(1980)]],
        url_certificado: [],
        url_imagen_estudio: ['']

      }
    )
  }
  get Titulo() { return this.formFormacion.get("titulo"); }
  get Descripcion() { return this.formFormacion.get("descripcion"); }
  get Fecha() { return this.formFormacion.get("fecha"); }
  get Url_certificado() { return this.formFormacion.get("url_certificado"); }
  get Url_imagen() { return this.formFormacion.get("url_imagen_estudio"); }

  ngOnInit(): void {
    this.getEstudios();
    if(window.sessionStorage.getItem('isAdmin')==='true' )
    this.isAdmin=true;
    else
    this.isAdmin=false;
  }

  public getEstudios(): void {
    this.formacionService.obtenerEstudios().subscribe({
      next: (Response: Estudio[]) => {
        this.estudios = Response;
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);

        // console.log(error.message);
      }
    })
  }



  public abrirModal(modo: string, estudio?: Estudio): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.formFormacion.reset();
    this.modo = modo;
    if (modo === 'add') {
      this.titleForm = 'Registrar nueva formación'
      button.setAttribute('data-target', '#addFormacionModal');
    } else if (modo === 'delete') {
      this.borrarEstudio = estudio;
      button.setAttribute('data-toggle', '#deleteFormacionModal');
    } else if (modo === 'edit') {
      this.titleForm = 'Editar formación'

      // this.editEstudio = estudio;
      this.cargarFormularioFormacion(estudio!);
      button.setAttribute('data-toggle', '#addFormacionModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public saveFormacion(event: Event) {

    // document.getElementById('add-formacion-form')?.click();
    if (this.modo === 'add') {
      if (this.formFormacion.valid) {
        this.formacionService.addEstudio(this.formFormacion.value).subscribe({
          next: (response: Estudio) => {
            // console.log(response);
            this.mensajeService.showSuccess(`Se guardó correctamente la formación ${this.formFormacion.value["titulo"]}`);
            this.getEstudios();
            this.formFormacion.reset();
          },
          error: (error: HttpErrorResponse) => {
            //console.log(error.message);
            this.mensajeService.showError(`No fué posible registrar la formación ${error.message}`);
            this.formFormacion.reset();

          }

        });
      }
    }
    else if (this.modo === 'edit') {
      // this.editEstudio = estudio;
      // document.getElementById('edit-formacion-form');
      this.formacionService.updateEstudio(this.formFormacion.value).subscribe({
        next: (response: Estudio) => {
          this.mensajeService.showSuccess("Se modificó la formación correctamente");
          this.getEstudios();

        },
        error: (error: HttpErrorResponse) => {
          this.mensajeService.showError(`No fué posible editar la formación ${error.message}`);
          //console.log(error.message);
        }
      });
    }
  }

  cargarFormularioFormacion(formacion: Estudio) {
    this.formFormacion.patchValue(formacion)
  }



  // public onEditFormacion(estudio: Estudio): void {
  //   this.editEstudio = estudio;
  //   document.getElementById('edit-formacion-form');
  //   this.formacionService.updateEstudio(estudio).subscribe({
  //     next: (response: Estudio) => {
  //       this.mensajeService.showSuccess("Se modificó la formación correctamente");
  //       this.getEstudios();

  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.mensajeService.showError("No fue posible modificar la formación");

  //       console.log(error.message);
  //     }
  //   });
  // }
  public onDeleteFormacion(idEdu: number): void {


    this.formacionService.deleteEstudio(idEdu).subscribe({
      next: (response: void) => {
        // console.log(response);
        this.mensajeService.showWarn(`Se eliminó la formación`)
        this.getEstudios();

      },
      error: (error: HttpErrorResponse) => {
        //  console.log(error.message);
        this.mensajeService.showError(`No se pudo eliminar la formación. ${error.message}`);

      }
    });
  }

}
