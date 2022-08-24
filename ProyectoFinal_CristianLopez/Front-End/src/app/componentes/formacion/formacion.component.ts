import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Estudio } from 'src/app/model/estudio.model';
import { FormacionService } from 'src/app/services/formacion.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  public estudios: Estudio[] = [];
  public borrarEstudio: Estudio | undefined;
  hasAccess = false;
  authorities: string[] = [];
 
  formFormacion: FormGroup;
  modo: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private formacionService: FormacionService,
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
    this.hasAccess=(window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
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
    let myModal = document.getElementById('addFormacionModal')
    let myInput = document.getElementById('tituloFormacion')

    $('#addFormacionModal').on('shown.bs.modal', function () {
      $('#tituloFormacion').focus();
    });

    if (modo === 'add') {
      $("#tituloFormFormacion").html("Registrar Nueva Formación");
      button.setAttribute('data-target', '#addFormacionModal');
    }
    else if (modo === 'delete') {
      this.borrarEstudio = estudio;
      button.setAttribute('data-toggle', '#deleteFormacionModal');
    } else if (modo === 'edit') {
      $("#tituloFormFormacion").html("Editar Formación");
      this.cargarFormularioFormacion(estudio!);
      button.setAttribute('data-toggle', '#addFormacionModal');

    }
    container?.appendChild(button);
    button.click();
  }

  saveFormacion(event: Event) {
    if (this.modo === 'add') {
      if (this.formFormacion.valid) {
        this.formacionService.addEstudio(this.formFormacion.value).subscribe({
          next: (response: Estudio) => {
            this.mensajeService.showSuccess(`Se guardó correctamente la formación ${this.formFormacion.value["titulo"]}`);
            this.getEstudios();
            this.formFormacion.reset();
          },
          error: (error: HttpErrorResponse) => {
            this.mensajeService.showError(`No fué posible registrar la formación ${error.message}`);
            this.formFormacion.reset();

          }

        });
      }
    }

    else if (this.modo === 'edit') {
      this.formacionService.updateEstudio(this.formFormacion.value).subscribe({
        next: (response: Estudio) => {
          this.mensajeService.showSuccess("Se modificó la formación correctamente");
          this.getEstudios();

        },
        error: (error: HttpErrorResponse) => {
          this.mensajeService.showError(`No fué posible editar la formación ${error.message}`);
        }
      });
    }
  }

  cargarFormularioFormacion(formacion: Estudio) {
    this.formFormacion.patchValue(formacion);
  }


  public onDeleteFormacion(idEdu: number): void {

    this.formacionService.deleteEstudio(idEdu).subscribe({
      next: (response: void) => {

        this.mensajeService.showWarn(`Se eliminó la formación`)
        this.getEstudios();
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`No se pudo eliminar la formación. ${error.headers}`);
      }
    });
  }
}
