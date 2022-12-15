import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Experiencia } from 'src/app/model/experiencia.model';

import { ExperienciaService } from 'src/app/services/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/notificaciones.service';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  public experiencias: Experiencia[] = [];
  public editExperiencia: Experiencia | undefined;
  public borrarExperiencia: Experiencia | undefined;

  hasAccess = false;
  authorities: string[] = [];
  formExperienciaLaboral: UntypedFormGroup;
  modo = '';
  constructor(
    private formBuider: UntypedFormBuilder,
    private experienciaService: ExperienciaService,

    private mensajeService: NotificacionesService) {
    this.formExperienciaLaboral = this.formBuider.group({
      idExp: [],
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(250)],
      nombre_empresa: ['', Validators.maxLength(100)],
      fecha_inicio: ['', [Validators.maxLength(4), Validators.minLength(4)]],
      fecha_fin: ['', [Validators.maxLength(4)]],
      logo_empresa: ['']

    })
  }
  get titulo() { return this.formExperienciaLaboral.get("titulo"); }
  get descripcion() { return this.formExperienciaLaboral.get("descripcion"); }
  get nombre_empresa() { return this.formExperienciaLaboral.get("nombre_empresa"); }
  get fecha_inicio() { return this.formExperienciaLaboral.get("fecha_inicio"); }
  get fecha_fin() { return this.formExperienciaLaboral.get("fecha_fin"); }
  get logo_empresa() { return this.formExperienciaLaboral.get("logo_empresa"); }
  ngOnInit(): void {
    AOS.init({
      delay: 0,
      offset: 500,
      duration: 3000
    });
    this.getExperiencias();

    this.hasAccess = (window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
  }

  public getExperiencias(): void {
    this.experienciaService.obtenerExperiencias().subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencias = Response;
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);


      }
    })
  }
  public abrirModal(modo: string, experiencia?: Experiencia): void {
    this.formExperienciaLaboral.reset();
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo = modo;

    $('#addExperienciaModal').on('shown.bs.modal', function () {
      $('#tituloExperiencia').focus();
    });

    if (modo === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
      $("#tituloModalExperiencia").html("Registrar Experiencia Laboral");

    } else if (modo === 'delete') {
      this.borrarExperiencia = experiencia;
      button.setAttribute('data-toggle', '#deleteExperienciaModal');
    } else if (modo === 'edit') {
      $("#tituloModalExperiencia").html("Editar Experiencia Laboral");
      this.cargarFormularioExperiencia(experiencia!);
      this.editExperiencia = experiencia;
      button.setAttribute('data-toggle', '#addExperienciaModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public saveExperiencia(event: Event) {


    if (this.modo === 'add') {
      if (this.formExperienciaLaboral.valid) {
        this.experienciaService.addExperiencia(this.formExperienciaLaboral.value).subscribe({
          next: (response: Experiencia) => {

            this.mensajeService.showSuccess(`Se guardó correctamente la experiencia ${this.formExperienciaLaboral.value["titulo"]}`);
            this.getExperiencias();
            this.formExperienciaLaboral.reset();
          },
          error: (error: HttpErrorResponse) => {

            this.mensajeService.showError(`No fué posible registrar la experiencia. ${error}`);
            this.formExperienciaLaboral.reset();

          }
        });
      }
    }
    else if (this.modo === 'edit') {


      this.experienciaService.updateExperiencia(this.formExperienciaLaboral.value).subscribe({
        next: (response: Experiencia) => {

          this.mensajeService.showSuccess("Se modificó la experiencia correctamente");
          this.getExperiencias();
        },
        error: (error: HttpErrorResponse) => {
          this.mensajeService.showError(`No fué posible editar la experiencia ${error.message}`);
        }
      });
    }

  }
  cargarFormularioExperiencia(experiencia: Experiencia) {
    this.formExperienciaLaboral.patchValue(experiencia);
  }


  public onDeleteExperiencia(id_exp: number): void {


    this.experienciaService.deleteExperiencia(id_exp).subscribe({
      next: (response: void) => {

        this.mensajeService.showWarn(`Se eliminó la experiencia laboral.`);

        this.getExperiencias();

      },
      error: (error: HttpErrorResponse) => {

        this.mensajeService.showError(`No se pudo eliminar la experiencia laboral. ${error.message}`);

      }
    });
  }
}
