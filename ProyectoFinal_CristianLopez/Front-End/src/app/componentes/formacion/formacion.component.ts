import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Estudio } from 'src/app/model/estudio.model';
import { FormacionService } from 'src/app/services/formacion.service';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {

  public estudios:Estudio[]=[];
  public editEstudio:Estudio | undefined;
  public borrarEstudio:Estudio | undefined;

  faPencil = faPencilAlt;
  basuraIcono=faTrashCan;
  constructor(private formacionService:FormacionService) { }

  ngOnInit(): void {
    this.getEstudios();
  }

  public getEstudios():void{
    this.formacionService.obtenerEstudios().subscribe({
      next:(Response:Estudio[]) => {
        this.estudios=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
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

  public onAddFormacion(addForm:NgForm){
    
    document.getElementById('add-formacion-form')?.click();

    if(addForm.valid){
    this.formacionService.addEstudio(addForm.value).subscribe({
      next: (response:Estudio) => {
        console.log(response);
        this.getEstudios();
        addForm.resetForm();
         },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.resetForm();

      }

    });
  }

  }
  public onEditFormacion(estudio:Estudio): void{
    this.editEstudio=estudio;
    document.getElementById('edit-formacion-form');
    this.formacionService.updateEstudio(estudio).subscribe({
      next: (response:Estudio) => {
        console.log(response);
        this.getEstudios();
        
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
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
        alert(error.message);
      }
    });
  }

}
