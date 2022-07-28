import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Experiencia } from 'src/app/model/experiencia.model';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';


@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  public experiencias:Experiencia[]=[];
  public editExperiencia:Experiencia | undefined;
  public borrarExperiencia:Experiencia | undefined;
  faPencil = faPencilAlt;
  basuraIcono=faTrashCan;
  isAdmin = false;
  authorities: string[] = [];
  constructor(private experienciaService:ExperienciaService, private tokenService: TokenService, private mensajeService:NotificacionesService ) { }

  ngOnInit(): void {
    AOS.init({
      delay: 0,
      offset: 500,
      duration: 3000
    });
    this.getExperiencias();
    
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }

  }

  public getExperiencias():void{
    this.experienciaService.obtenerExperiencias().subscribe({
      next:(Response:Experiencia[]) => {
        this.experiencias=Response;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }
  public abrirModal(modo:String, experiencia?:Experiencia):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(modo==='add'){
      button.setAttribute('data-target', '#addExperienciaModal');
    } else if(modo==='delete'){
      this.borrarExperiencia=experiencia;
       button.setAttribute('data-toggle', '#deleteExperienciaModal');
    } else if(modo==='edit'){
      this.editExperiencia=experiencia;
      button.setAttribute('data-toggle', '#editExperienciaModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addForm:NgForm){
    
    document.getElementById('add-experiencia-form')?.click();

    if(addForm.valid){
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response:Experiencia) => {
        //console.log(response);
        this.mensajeService.showSuccess(`Se guardó correctamente la habilidad ${addForm.value["titulo"]}`);
        
        this.getExperiencias();
        addForm.resetForm();
         },
      error:(error:HttpErrorResponse)=>{
     // console.log(error.message);
     this.mensajeService.showError(`No fué posible registrar la habilidad. ${error}`);
      
     addForm.resetForm();

      }

    });
  }

  }
  
   

  public onEditExperiencia(experiencia:Experiencia): void{
    this.editExperiencia=experiencia;
    document.getElementById('edit-formacion-form');
    this.experienciaService.updateExperiencia(experiencia).subscribe({
      next: (response:Experiencia) => {
        console.log(response);
        this.getExperiencias();
        
      },
      error:(error:HttpErrorResponse)=>{
     console.log(error.message);
      }
    });
  }
  public onDeleteExperiencia(idExp:number):void{
  
    
    this.experienciaService.deleteExperiencia(idExp).subscribe({
      next: (response:void) => {
        console.log(response);
        this.getExperiencias();
        
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    });
  }
}
