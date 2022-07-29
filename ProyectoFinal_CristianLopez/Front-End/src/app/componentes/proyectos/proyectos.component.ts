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
  tituloModal: string = '';
  formProyecto: FormGroup;


  isAdmin = false;
  authorities: string[] = [];
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private tokenService: TokenService,
    private mensajeService: NotificacionesService) {
    this.formProyecto = formBuilder.group({
      id: [],
      titulo: ['', [Validators.required]],
      descripcion: [],
      link: [],
      url_image1: [],
      url_image2: [],
      url_image3: [],
      fecha_realizacion: []

    });
 
  }

  ngOnInit(): void {
    this.getProyectos();
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }
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
    
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo = modo;
    if (modo === 'add') {
      this.tituloModal = "Registrar nuevo proyecto";
    } else if (modo === 'delete') {
      this.borrarProyecto = proyecto;
      button.setAttribute('data-toggle', '#deleteProyectoModal');
    } else if (modo === 'edit') {
    
      this.tituloModal = "Editar proyecto";
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
        this.getProyectos();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  cargarFormularioProyecto(proyecto: Proyecto) {
    this.formProyecto.patchValue(proyecto);
  }

}
