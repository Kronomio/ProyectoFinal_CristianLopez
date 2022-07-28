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

  public estudios:Estudio[]=[];
  public editEstudio:Estudio | undefined;
  public borrarEstudio:Estudio | undefined;
  isAdmin = false;
  authorities: string[] = [];
  faPencil = faPencilAlt;
  basuraIcono=faTrashCan;
  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formacionService:FormacionService, 
    private tokenService: TokenService, 
    private mensajeService:NotificacionesService) { 
      this.form = this.formBuilder.group(
        {
          titulo: ['', [Validators.required]],
          descripcion: [],
          fecha: [],
          url_certificado: [],
          url_imagen_estudio: ['']
  
        }
      )
    }
    get Titulo() { return this.form.get("titulo"); }
    get Descripcion() { return this.form.get("descripcion"); }
    get Fecha() { return this.form.get("fecha"); }
    get Url_certificado() { return this.form.get("url_certificado"); }
    get Url_imagen() { return this.form.get("url_imagen_estudio"); }

  ngOnInit(): void {
    this.getEstudios();
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }
  }

  public getEstudios():void{
    this.formacionService.obtenerEstudios().subscribe({
      next:(Response:Estudio[]) => {
        this.estudios=Response;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

 

  public abrirModal(modo:String, estudio?:Estudio):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(modo==='add'){
      button.setAttribute('data-target', '#addFormacionModal');
    } else if(modo==='delete'){
      this.borrarEstudio=estudio;
       button.setAttribute('data-toggle', '#deleteFormacionModal');
    } else if(modo==='edit'){
      this.editEstudio=estudio;
      button.setAttribute('data-toggle', '#editFormacionModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public onAddFormacion(event:Event){
    
    document.getElementById('add-formacion-form')?.click();

    if(this.form.valid){
    this.formacionService.addEstudio(this.form.value).subscribe({
      next: (response:Estudio) => {
       // console.log(response);
       this.mensajeService.showSuccess(`Se guardó correctamente la formación ${this.form.value["titulo"]}`);
        this.getEstudios();
        this.form.reset();
         },
      error:(error:HttpErrorResponse)=>{
      //console.log(error.message);
      this.mensajeService.showError(`No fué posible registrar la formación ${this.form.value["titulo"]}`);
      this.form.reset();

      }

    });
  }

  }
  public onEditFormacion(estudio:Estudio): void{
    this.editEstudio=estudio;
    document.getElementById('edit-formacion-form');
    this.formacionService.updateEstudio(estudio).subscribe({
      next: (response:Estudio) => {
        this.mensajeService.showSuccess("Se modificó la formación correctamente");
        this.getEstudios();
        
      },
      error:(error:HttpErrorResponse)=>{
        this.mensajeService.showError("No fue posible modificar la formación");
      
        console.log(error.message);
      }
    });
  }
  public onDeleteFormacion(idEdu:number):void{
  
    
    this.formacionService.deleteEstudio(idEdu).subscribe({
      next: (response:void) => {
        console.log(response);
        this.getEstudios();
        
      },
      error:(error:HttpErrorResponse)=>{
       console.log(error.message);
      }
    });
  }

}
