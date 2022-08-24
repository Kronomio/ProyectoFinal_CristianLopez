import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  persona?:Persona;
  $refs: any;
  constructor(private personaService: PersonaService) { this.isAdmin=false; }
  isAdmin:boolean;
  ngOnInit(): void {
   
    this.verPersonas();
    this.isAdmin=(window.sessionStorage.getItem('isAdmin') === 'true');
  }

  public verPersonas(): void {
    this.personaService.verPersonas().subscribe({
      next: (response: Persona) => {
        this.persona = response;      
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }

    });
  }

}
