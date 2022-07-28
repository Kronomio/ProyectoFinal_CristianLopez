import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habilidad } from 'src/app/model/habilidad.model';
import { HabilidadesService } from 'src/app/services/habilidades.service';

@Component({
  selector: 'app-m-habilidad',
  templateUrl: './m-habilidad.component.html',
  styleUrls: ['./m-habilidad.component.css']
})
export class MHabilidadComponent {

  @Input() title='';
  public show=false;
  form:FormGroup;

  public habilidades: Habilidad[] = [];
  public editHabilidad: Habilidad | undefined;
  public borrarHabilidad: Habilidad | undefined;
  
  constructor(private formBuilder: FormBuilder, private habilidadService: HabilidadesService) {
    this.form=this.formBuilder.group(
      {
        nombre:['', [Validators.required]],
        porcentaje:['0', [Validators.max(100)]],
        color1:[],
        color2:[],
        url_imagen:['', [Validators.required]]
        
      }
    )
   }

  public showModal(){
    this.show=true;
  }

  public hideModal(){
    this.show=false;
  }

  public onAddHabilidad(event:Event) {
    event.preventDefault;
    document.getElementById('add-habilidad-form')?.click();

    if (this.form.valid) {
      this.habilidadService.addHabilidad(this.form.value).subscribe({
        next: (response: Habilidad) => {
          //console.log(response);
          //this.getHabilidades();
          this.form.reset();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          this.form.reset();

        }

      });
    }

  }
}
