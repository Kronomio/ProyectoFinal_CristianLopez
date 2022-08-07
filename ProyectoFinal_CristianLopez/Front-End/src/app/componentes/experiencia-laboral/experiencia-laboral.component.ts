import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Experiencia } from 'src/app/model/experiencia.model';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  isAdmin = false;
  authorities: string[] = [];
  formExperienciaLaboral: FormGroup;
  modo='';
  constructor(
    private formBuider: FormBuilder,
    private experienciaService: ExperienciaService,
    private tokenService: TokenService,
    private mensajeService: NotificacionesService) {
    this.formExperienciaLaboral = this.formBuider.group({
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

    if (window.sessionStorage.getItem('isAdmin') === 'true')
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }

  public getExperiencias(): void {
    this.experienciaService.obtenerExperiencias().subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencias = Response;
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);

        // console.log(error.message);
      }
    })
  }
  public abrirModal(modo: string, experiencia?: Experiencia): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo=modo;
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

    //document.getElementById('add-experiencia-form')?.click();
    if (this.modo === 'add') {
      if (this.formExperienciaLaboral.valid) {
        this.experienciaService.addExperiencia(this.formExperienciaLaboral.value).subscribe({
          next: (response: Experiencia) => {
            //console.log(response);
            this.mensajeService.showSuccess(`Se guardó correctamente la habilidad ${addForm.value["titulo"]}`);

            this.getExperiencias();
            this.formExperienciaLaboral.reset();
          },
          error: (error: HttpErrorResponse) => {
            // console.log(error.message);
            this.mensajeService.showError(`No fué posible registrar la habilidad. ${error}`);

            this.formExperienciaLaboral.reset();

          }

        });
      }
    }
    else if (this.modo === 'edit') {
     // this.editExperiencia=experiencia;
        //document.getElementById('edit-formacion-form');
        this.experienciaService.updateExperiencia(this.formExperienciaLaboral.value).subscribe({
          next: (response:Experiencia) => {
          this.mensajeService.showSuccess("Se modificó la experiencia correctamente");
           
            this.getExperiencias();
    
          },
          error:(error:HttpErrorResponse)=>{
          this.mensajeService.showError(`No fué posible editar la experiencia ${error.message}`);

         //console.log(error.message);
          }
        });
    }

  }
  cargarFormularioExperiencia(experiencia:Experiencia)
  {
    this.formExperienciaLaboral.patchValue(experiencia);
  }


  // public onEditExperiencia(experiencia:Experiencia): void{
  //   this.editExperiencia=experiencia;
  //   document.getElementById('edit-formacion-form');
  //   this.experienciaService.updateExperiencia(experiencia).subscribe({
  //     next: (response:Experiencia) => {
  //       console.log(response);
  //       this.getExperiencias();

  //     },
  //     error:(error:HttpErrorResponse)=>{
  //    console.log(error.message);
  //     }
  //   });
  // }
  public onDeleteExperiencia(idExp: number): void {


    this.experienciaService.deleteExperiencia(idExp).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiencias();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }
}
