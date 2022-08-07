import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  public persona: Persona | undefined;
  public editPersona: Persona | undefined;
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  isAdmin = false;
  isLogged=false;
  authorities: string[] = [];
  formDatosPersonales: FormGroup;
  constructor(private formBuilder:FormBuilder,
    public personaService: PersonaService, 
    private tokenService: TokenService,
    private mensajeService:NotificacionesService) { 
      this.formDatosPersonales=this.formBuilder.group(
        {
          nombre:['', [Validators.required]],
          apellido:['', [Validators.required]],
          fecha_nac:['01-01-1900'],
          url_foto:[],
          telefono:[],
          acerca_de:[],
          link_whatsaap:[''],
          link_instagram:[],
          link_linkedin:[],
          link_twitter:[],
          mail:['', [Validators.email]]
        }

      )
    }


  ngOnInit(): void {
    this.verPersonas();
    
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
      this
    } else { this.isAdmin = false; }
  }

  public verPersonas(): void {
    this.personaService.verPersonas().subscribe({
      next: (response: Persona) => {
        this.persona = response;
        this.cargarDatosPersonales(this.persona!);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }

    });

  }

  public guardarPersona(event:Event) {

   
    if (this.formDatosPersonales.valid) {

      this.personaService.actualizarPersona(this.formDatosPersonales.value).subscribe({
        next: (response: Persona) => {
          this.mensajeService.showSuccess(`Se actualizó la información de la persona`);

          this.verPersonas();
          this.formDatosPersonales.reset();
          window.location.reload();

        },
        error: (error: HttpErrorResponse) => {
         
          this.mensajeService.showError(`No fué posible actualizar la información: ${error.message}`);
          this.verPersonas();
          
        }
      })

    }
  }
  cargarDatosPersonales(persona:Persona){
    
    this.formDatosPersonales.patchValue(persona);
  }
}
