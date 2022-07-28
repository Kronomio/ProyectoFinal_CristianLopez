import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/model/habilidad.model';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades: Habilidad[] = [];
  public editHabilidad: Habilidad | undefined;
  public borrarHabilidad: Habilidad | undefined;

  form: FormGroup;
  modo: string = '';
  tituloModal: string = '';
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  isAdmin = false;
  authorities: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private habilidadService: HabilidadesService,
    private tokenService: TokenService,
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
    this.authorities = this.tokenService.getAuthorities();
    if (this.authorities.indexOf("ROLE_ADMIN") != -1) {
      this.isAdmin = true;
    } else { this.isAdmin = false; }
  }
  public getHabilidades(): void {
    this.habilidadService.obtenerHabilidad().subscribe({
      next: (Response: Habilidad[]) => {
        this.habilidades = Response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
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
    if (modo === 'add') {
      this.tituloModal = "Registrar Habilidad";
      
      button.setAttribute('data-target', '#addHabilidadModal');
    } else if (modo === 'delete') {
      this.borrarHabilidad = habilidad;
      button.setAttribute('data-toggle', '#deleteHabilidadModal');
    } else if (modo === 'edit') {
      //this.editHabilidad = habilidad;
      this.tituloModal = "Editar Habilidad"
      this.cargarForm(habilidad!);
      button.setAttribute('data-toggle', '#addHabilidadModal');

    }
    container?.appendChild(button);
    button.click();
  }

  // public onAddHabilidad(event: Event) {
  //   event.preventDefault;
  //   document.getElementById('add-habilidad-form')?.click();

  //   if (this.form.valid) {
  //     this.habilidadService.addHabilidad(this.form.value).subscribe({
  //       next: (response: Habilidad) => {
  //         //console.log(response);
  //         this.mensajeService.showSuccess(`Se guardó correctamente la habilidad ${this.form.value["nombre"]}`);
  //         this.getHabilidades();
  //         this.form.reset();
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.log(error.message);
  //         this.mensajeService.showError(`No fué posible registrar la habilidad.  ${error}`);
  //         this.form.reset();

  //       }

  //     });
  //   }

  // }

  public guardarHabilidad(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      if (this.modo === 'add') {
        // document.getElementById('add-habilidad-form')?.click();


        this.habilidadService.addHabilidad(this.form.value).subscribe({
          next: (response: Habilidad) => {

            this.mensajeService.showSuccess(`Se guardó correctamente la habilidad ${this.form.value["nombre"]}`);
            this.getHabilidades();
           
          },
          error: (error: HttpErrorResponse) => {
            //console.log(error.message);
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


  // public onEditHabilidad(habilidad: Habilidad): void {
  //   this.editHabilidad = habilidad;
  //   document.getElementById('edit-formacion-form');
  //   this.habilidadService.updateHabilidad(this.editHabilidad).subscribe({
  //     next: (response: Habilidad) => {
  //       //console.log(response);
  //       this.mensajeService.showSuccess(`Se modificó con éxito la habilidad ${this.editHabilidad?.nombre}`);

  //       this.getHabilidades();

  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.mensajeService.showError(`No se pudo registrar la habilidad. ${error}`);

  //       //console.log(error.message);
  //     }
  //   });
  // }
  public onDeleteHabilidad(idHab: number): void {


    this.habilidadService.deleteHabilidad(idHab).subscribe({
      next: (response: void) => {
        //console.log(response);
        this.mensajeService.showWarn(`Se eliminó la habilidad`)
        this.getHabilidades();

      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`No se pudo eliminar la habilidad. ${error}`);


      }
    });
  }

  public cargarForm(habilidad: Habilidad) {
    this.form.patchValue(
      {
        idHab: habilidad.idHab,
        nombre: habilidad.nombre,
        porcentaje: habilidad.porcentaje,
        color1: habilidad.color1,
        color2: habilidad.color2,
        url_imagen: habilidad.url_imagen
      })
  }
}

