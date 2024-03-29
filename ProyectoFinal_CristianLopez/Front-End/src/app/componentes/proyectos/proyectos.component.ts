import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Proyecto } from 'src/app/model/proyecto.model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyecto[] = [];
 
  public borrarProyecto: Proyecto | undefined;
  modo: string = '';
  formProyecto: FormGroup;
  hasAccess = false;
  
  
  basuraIcono = faTrashCan;
  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
  
    private mensajeService: NotificacionesService) {
    this.formProyecto = formBuilder.group({
      id: [],
      titulo: ['', [Validators.required, Validators.maxLength(45)]],
      descripcion: ['', [Validators.maxLength(250)]],
      link: ['', [ Validators.maxLength(250)]],
      url_image1: ['', [Validators.maxLength(250)]],
      url_image2: ['', [Validators.maxLength(250)]],
      url_image3: ['', [Validators.maxLength(250)]],
      fecha_realizacion: ['', [Validators.maxLength(4), Validators.minLength(4)]]

    });
 
  }
  get titulo() { return this.formProyecto.get("titulo"); }
  get descripcion() { return this.formProyecto.get("descripcion"); }
  get link() { return this.formProyecto.get("link"); }
  get url_image1() { return this.formProyecto.get("url_image1"); }
  get url_image2() { return this.formProyecto.get("url_image2"); }
  get url_image3() { return this.formProyecto.get("url_image3"); }
  get fecha_realizacion() { return this.formProyecto.get("fecha_realizacion"); }


  ngOnInit(): void {
    this.getProyectos();
    this.hasAccess=(window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
  }

  public getProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (Response: Proyecto[]) => {
        this.proyectos = Response;
       
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);
      
      }
    })
  }
    


  public abrirModal(modo: string, proyecto?: Proyecto): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    this.formProyecto.reset();
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo = modo;
    if (modo === 'add') {
      $("#tituloModalProyectos").html("Registrar Nuevo Proyecto");
      
    } else if (modo === 'delete') {
      this.borrarProyecto = proyecto;
      button.setAttribute('data-toggle', '#deleteProyectoModal');
    } else if (modo === 'edit') {
      $("#tituloModalProyectos").html("Editar Proyecto");

      this.cargarFormularioProyecto(proyecto!);      
    }
    
    container?.appendChild(button);
    button.click();
  }

  public saveProyecto(event: Event) {

    if (this.formProyecto.valid) {

      if (this.modo === 'add') {
        this.proyectoService.addProyecto(this.formProyecto.value).subscribe({
          next: (response: Proyecto) => {

            this.mensajeService.showSuccess(`Se guardó correctamente el proyecto ${this.formProyecto.value["nombre"]}`);

            this.getProyectos();
            this.formProyecto.reset();
          },
          error: (error: HttpErrorResponse) => {

            this.mensajeService.showError(`No fué posible registrar el proyecto.  ${error.message}`);

            this.formProyecto.reset();

          }

        });
      }
    
    else if (this.modo === 'edit') {


      this.proyectoService.updateProyecto(this.formProyecto.value).subscribe({
        next: (response: Proyecto) => {

          this.mensajeService.showSuccess(`Se editó correctamente el proyecto ${this.formProyecto.value["nombre"]}`);

          this.getProyectos();

        },
        error: (error: HttpErrorResponse) => {

          this.mensajeService.showError(`No fué posible editar el proyecto.  ${error.message}`);

        }
      });



    }
  }
  }
 
  public onDeleteProyecto(id: number): void {

    this.proyectoService.deleteProyecto(id).subscribe({
      next: (response: void) => {
        // console.log(response);
        this.mensajeService.showWarn(`Se eliminó el proyecto`)

        this.getProyectos();

      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`No se pudo eliminar la habilidad. ${error.message}`);

        
      }
    });
  }

  cargarFormularioProyecto(proyecto: Proyecto) {
    this.formProyecto.patchValue(proyecto);
  }

}
