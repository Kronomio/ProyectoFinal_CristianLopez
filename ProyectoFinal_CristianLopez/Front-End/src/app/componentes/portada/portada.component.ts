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
  isLogged=false;
  formDatosPersonales: FormGroup;
  
  pipe=new DatePipe('en-US');
  constructor(private formBuilder:FormBuilder,
    public personaService: PersonaService, 
    private mensajeService:NotificacionesService) { 
      this.formDatosPersonales=this.formBuilder.group(
        {
          nombre:['', [Validators.required]],
          apellido:['', [Validators.required]],
          fecha_nac:['1900-01-01'],
          url_foto:['', [Validators.maxLength(100)]],
          url_fondo:['', [Validators.maxLength(100)]],
          telefono:['', [Validators.maxLength(20)]],
          acerca_de:['', [Validators.maxLength(255)]],
          link_facebook:['', [Validators.maxLength(100)]],
          link_instagram:['', [Validators.maxLength(100)]],
          link_linkedin:['', [Validators.maxLength(100)]],
          link_twitter:['', [Validators.maxLength(100)]],
          link_google:['', [Validators.maxLength(100)]],
          link_github:['', [Validators.maxLength(100)]],
          mail:['', [Validators.email]],
          ciudad:['', [Validators.maxLength(100)]],
          pais:['', [Validators.maxLength(100)]]
        }

      );
      
    }


  ngOnInit(): void {

    this.hasAccess=(window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
  }

 
    

  public guardarPersona(event:Event) { 
    if (this.formDatosPersonales.valid) {
        if(this.formDatosPersonales.get('url_fondo')?.value=='' || this.formDatosPersonales.get('url_fondo')?.value==null)
          this.formDatosPersonales.patchValue({url_fondo:'/assets/fondoHeader.jpg'});
    try{  
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
      })

    }
    catch{
      this.mensajeService.showError(`No fué posible actualizar la información`);

    }
  }
}
  cargarDatosPersonales(persona:Persona){
   
    $('#modificarDatosPersonales').on('shown.bs.modal', function () {
      $('#nombre').focus();
      
    });
    
    this.formDatosPersonales.patchValue(persona);
    this.formDatosPersonales.patchValue({fecha_nac:this.pipe.transform(persona.fecha_nac, 'yyyy-MM-dd')});
    


  }
}
