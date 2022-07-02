import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {
 
  public persona:Persona | undefined;
  public editPersona:Persona | undefined;
 
  
  constructor(public personaService: PersonaService) { }
  
  // personaForm=new FormGroup({
  //   nombre: new FormControl(''),
  //   apellido: new FormControl(''),
  //   acerca_de: new FormControl(''),
  //   url_foto: new FormControl(''),
  //   link_linkedin: new FormControl(''),
  //   link_instagram: new FormControl(''),
  //   link_twitter: new FormControl(''),
  //   link_facebook: new FormControl(''),
  //   fecha_nac: new FormControl(''),
  //   telefono: new FormControl(''),
  //   mail: new FormControl('')

    

  // }

  // )
  ngOnInit(): void {
    this.verPersonas();
  }

  public verPersonas():void{
    this.personaService.verPersonas().subscribe({
      next: (response:Persona) => {
        this.persona=response;
        
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
      
    });
    
  }


  public guardarPersona(formulario:NgForm){
    
    console.log("¿Válido?", formulario.valid);
    console.log("Valores", formulario.value);

    if(formulario.valid){
      
      this.personaService.actualizarPersona(formulario.value).subscribe({
        next: (response:Persona) =>{
          console.log(response);
          this.verPersonas();
          window.location.reload();


        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
      
    }

     
      
      
     

  }
}
