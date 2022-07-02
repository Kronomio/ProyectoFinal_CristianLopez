import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalSwitch:boolean | undefined;
  public persona:Persona | undefined;
 public editPersona:Persona | undefined;  
  constructor(public personaService: PersonaService) { 


    }
    
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
    
  abrirLogin(){
  
    this.modalSwitch=true;
  }
}
