import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos:Proyecto[]=[];
  public editProyecto:Proyecto | undefined;
  public borrarProyecto:Proyecto | undefined;
  isAdmin = false;
  authorities: string[] = [];
  faPencil = faPencilAlt;
  basuraIcono=faTrashCan;
  constructor(private proyectoService:ProyectoService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getProyectos();
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }
  }
 
  public getProyectos():void{
    this.proyectoService.obtenerProyectos().subscribe({
      next:(Response:Proyecto[]) => {
        this.proyectos=Response;
        console.log(this.proyectos);
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }
  public abrirModal(modo: String, proyecto?: Proyecto): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (modo === 'add') {
      button.setAttribute('data-target', '#addProyectoModal');
    } else if (modo === 'delete') {
      this.borrarProyecto = proyecto;
      button.setAttribute('data-toggle', '#deleteProyectoModal');
    } else if (modo === 'edit') {
      this.editProyecto = proyecto;
      button.setAttribute('data-toggle', '#editProyectoModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addForm: NgForm) {

    document.getElementById('add-proyecto-form')?.click();

    if (addForm.valid) {
      this.proyectoService.addProyecto(addForm.value).subscribe({
        next: (response: Proyecto) => {
          //console.log(response);
          this.getProyectos();
          addForm.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          addForm.resetForm();

        }

      });
    }

  }
  public onEditProyecto(proyecto: Proyecto): void {
    this.editProyecto = proyecto;
    document.getElementById('edit-proyecto-form');
    this.proyectoService.updateProyecto(proyecto).subscribe({
      next: (response: Proyecto) => {
        //console.log(response);
        this.getProyectos();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
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

}
