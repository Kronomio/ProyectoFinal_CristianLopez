import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model'
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {
 public persona:Persona | undefined;
 public editPersona:Persona | undefined;
isAdmin=false;
authorities:string[]=[];
  constructor(public personaService: PersonaService, private tokenService:TokenService) { }

  ngOnInit(): void {
    
   this.verPersonas();


    this.authorities=this.tokenService.getAuthorities();

    if(this.authorities.indexOf("ROLE_ADMIN")!=-1)
    {
      this.isAdmin=true;
    }else{this.isAdmin=false;}
  }

  public verPersonas():void{
    this.personaService.verPersonas().subscribe({
      next: (response:Persona) => {
        this.persona=response;
      
      },
      error:(error:HttpErrorResponse)=>{
      console.log(error.message);
    }
      
    });
    
  }

}
