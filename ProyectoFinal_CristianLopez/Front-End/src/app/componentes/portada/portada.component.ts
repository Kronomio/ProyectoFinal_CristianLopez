import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  public persona: Persona | undefined;
  public editPersona: Persona | undefined;

  isAdmin = false;
  authorities: string[] = [];
  constructor(public personaService: PersonaService, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.verPersonas();

    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }
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

  public guardarPersona(formulario: NgForm) {

    console.log("¿Válido?", formulario.valid);
    console.log("Valores", formulario.value);

    if (formulario.valid) {

      this.personaService.actualizarPersona(formulario.value).subscribe({
        next: (response: Persona) => {
          console.log(response);
          this.verPersonas();
          window.location.reload();


        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      })

    }






  }
}
