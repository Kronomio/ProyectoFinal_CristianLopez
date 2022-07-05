import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalSwitch:boolean | undefined;
  public persona:Persona | undefined;
 public editPersona:Persona | undefined;  
 isLogged=false;
  constructor(public personaService: PersonaService, private router:Router, private tokenService:TokenService) { 


    }
    
  ngOnInit(): void {
    
   if(this.tokenService.getToken()){
    this.isLogged=true;
   }else{
    this.isLogged=false;
   }
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

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }
}
