import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/model/habilidad.model';
import { HabilidadesService } from 'src/app/services/habilidades.service';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { NotificacionesService } from 'src/app/services/notificaciones.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades: Habilidad[] = [];
  public borrarHabilidad: Habilidad | undefined;

  form: UntypedFormGroup;
  modo: string = '';
 
  hasAccess = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private habilidadService: HabilidadesService,
    private mensajeService: NotificacionesService) {
    this.form = this.formBuilder.group(
      {
        idHab: [],
        nombre: ['', [Validators.required]],
        porcentaje: ['0', [Validators.max(100)]],
        color1: [],
        color2: [],
        url_imagen: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    this.getHabilidades();

    this.hasAccess=(window.sessionStorage.getItem('isAdmin') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true');
    


  }
  public getHabilidades(): void {
    this.habilidadService.obtenerHabilidad().subscribe({
      next: (Response: Habilidad[]) => {
        this.habilidades = Response;
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);
      }
    })
  }

  public abrirModal(modo: string, habilidad?: Habilidad): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    this.form.reset();
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo = modo;
    $('#addHabilidadModal').on('shown.bs.modal', function () {
      $('#nombreHabilidad').focus();
    });
    
    if (modo === 'add') {
      $("#tituloModalHabilidad").html("Registrar Nueva Habilidad");

      button.setAttribute('data-target', '#addHabilidadModal');
    } else if (modo === 'delete') {
      this.borrarHabilidad = habilidad;
      button.setAttribute('data-toggle', '#deleteHabilidadModal');
    } else if (modo === 'edit') {
      
      $("#tituloModalHabilidad").html("Editar Habilidad");

      this.cargarForm(habilidad!);
      button.setAttribute('data-toggle', '#addHabilidadModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public guardarHabilidad(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      if (this.modo === 'add') {
        this.habilidadService.addHabilidad(this.form.value).subscribe({
          next: (response: Habilidad) => {

            this.mensajeService.showSuccess(`Se guardó correctamente la habilidad ${this.form.value["nombre"]}`);
            this.getHabilidades();

          },
          error: (error: HttpErrorResponse) => {

            this.mensajeService.showError(`No fue posible registrar la habilidad.  ${error.error}`);
          }
        });


      }
      else if (this.modo === 'edit') {

        this.habilidadService.updateHabilidad(this.form.value).subscribe({
          next: (response: Habilidad) => {
            this.mensajeService.showSuccess(`Se modificó con éxito la habilidad ${this.form.value["nombre"]}`);
            this.getHabilidades();
          },
          error: (error: HttpErrorResponse) => {
            this.mensajeService.showError(`No fue posible editar la habilidad. ${error.error}`);
          }
        });
      }
    }
  }

  get Nombre() { return this.form.get("nombre"); }
  get Porcentaje() { return this.form.get("porcentaje"); }
  get Url_imagen() { return this.form.get("url_imagen"); }



  public onDeleteHabilidad(idHab: number): void {
    try {
      this.habilidadService.deleteHabilidad(idHab).subscribe({
        next: (response: void) => {
          //console.log(response);
          this.mensajeService.showWarn(`Se eliminó la habilidad`)
          this.getHabilidades();

        },
        error: (error: HttpErrorResponse) => {
          this.mensajeService.showError(`No se pudo eliminar la habilidad. ${error.message}`);

        }
      });
    }
    catch {
      this.mensajeService.showError(`No se pudo eliminar la habilidad.`);

    }
  }

  public cargarForm(habilidad: Habilidad) {
    this.form.patchValue(habilidad)
  }
}

