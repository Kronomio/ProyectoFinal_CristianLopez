import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  @Input() public persona?: Persona;


  hasAccess = false;
  isLogged = false;
  formDatosPersonales: FormGroup;

  pipe = new DatePipe('en-US');
  constructor(private formBuilder: FormBuilder,
    public personaService: PersonaService,
    private mensajeService: NotificacionesService) {
    this.formDatosPersonales = this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        fecha_nac: [],
        url_foto: ['', [Validators.maxLength(250)]],
        url_fondo: ['', [Validators.maxLength(250)]],
        telefono: ['', [Validators.maxLength(100)]],
        acerca_de: ['', [Validators.maxLength(500)]],
        link_facebook: ['', [Validators.maxLength(250)]],
        link_instagram: ['', [Validators.maxLength(250)]],
        link_linkedin: ['', [Validators.maxLength(250)]],
        link_twitter: ['', [Validators.maxLength(250)]],
        link_google: ['', [Validators.maxLength(250)]],
        link_github: ['', [Validators.maxLength(250)]],
        mail: ['', [Validators.email, Validators.required]],
        ciudad: ['', [Validators.maxLength(100), Validators.required]],
        pais: ['', [Validators.maxLength(100), Validators.required]]
      }

    );

  }
get Nombre() { return this.formDatosPersonales.get('nombre')}
get Apellido() { return this.formDatosPersonales.get('apellido')}
get Fecha_nac() { return this.formDatosPersonales.get('fecha_nac')}
get Url_foto() { return this.formDatosPersonales.get('url_foto')}
get Url_fondo() { return this.formDatosPersonales.get('url_fondo')}
get Telefono() { return this.formDatosPersonales.get('telefono')}
get Acerca_de() { return this.formDatosPersonales.get('acerca_de')}
get Link_facebook() { return this.formDatosPersonales.get('link_facebook')}
get Link_linkedin() { return this.formDatosPersonales.get('link_linkedin')}
get Link_twitter() { return this.formDatosPersonales.get('link_twitter')}
get Link_google() { return this.formDatosPersonales.get('link_google')}
get  Mail() { return this.formDatosPersonales.get('mail')}
get Ciudad() { return this.formDatosPersonales.get('ciudad')}
get Pais() { return this.formDatosPersonales.get('pais')}


get link_instagram() { return this.formDatosPersonales.get('nombre')}


  ngOnInit(): void {

    this.hasAccess = (window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
  }



  public guardarPersona(event: Event) {
    

    if (this.formDatosPersonales.valid) {
      if (this.formDatosPersonales.get('url_fondo')?.value == '' || this.formDatosPersonales.get('url_fondo')?.value == null)
        this.formDatosPersonales.patchValue({ url_fondo: '/assets/fondoHeader.jpg' });

      
      this.personaService.actualizarPersona(this.formDatosPersonales.value).subscribe({
        next: (response: Persona) => {
          this.mensajeService.showSuccess(`Se actualizó la información de la persona`);

          //this.verPersonas();
          this.formDatosPersonales.reset();
          window.location.reload();

        },
        error: (error: HttpErrorResponse) => {

          this.mensajeService.showError(`No fué posible actualizar la información: ${error.message}`);


        }
      });

    }

  }

  cargarDatosPersonales(persona: Persona) {

    $('#modificarDatosPersonales').on('shown.bs.modal', function () {
      $('#nombre').focus();

    });

    this.formDatosPersonales.patchValue(persona);
    this.formDatosPersonales.patchValue({ fecha_nac: this.pipe.transform(persona.fecha_nac, 'yyyy-MM-dd') });



  }
}
