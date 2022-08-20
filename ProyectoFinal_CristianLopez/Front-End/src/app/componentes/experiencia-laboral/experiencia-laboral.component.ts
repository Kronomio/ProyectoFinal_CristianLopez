import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Experiencia } from 'src/app/model/experiencia.model';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
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
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  hasAccess = false;
  authorities: string[] = [];
  formExperienciaLaboral: FormGroup;
  modo = '';
  constructor(
    private formBuider: FormBuilder,
    private experienciaService: ExperienciaService,
   
    private mensajeService: NotificacionesService) {
    this.formExperienciaLaboral = this.formBuider.group({
      idExp:[],
      titulo: ['', Validators.required],
      descripcion: [''],
      nombre_empresa: [''],
      fecha_inicio: [],
      fecha_fin: [],
      logo_empresa: []

    })
  }

  ngOnInit(): void {
    AOS.init({
      delay: 0,
      offset: 500,
      duration: 3000
    });
    this.getExperiencias();

    this.hasAccess=(window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
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
