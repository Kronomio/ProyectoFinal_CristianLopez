import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Habilidad } from 'src/app/model/habilidad.model';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  public habilidades: Habilidad[] = [];
  public editHabilidad: Habilidad | undefined;
  public borrarHabilidad: Habilidad | undefined;
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  isAdmin = false;
  authorities: string[] = [];
  constructor(private habilidadService: HabilidadesService, private tokenService: TokenService) { }

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
  public abrirModal(modo: String, habilidad?: Habilidad): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (modo === 'add') {
      button.setAttribute('data-target', '#addHabilidadModal');
    } else if (modo === 'delete') {
      this.borrarHabilidad = habilidad;
      button.setAttribute('data-toggle', '#deleteHabilidadModal');
    } else if (modo === 'edit') {
      this.editHabilidad = habilidad;
      button.setAttribute('data-toggle', '#editHabilidadModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public onAddHabilidad(addForm: NgForm) {

    document.getElementById('add-habilidad-form')?.click();

    if (addForm.valid) {
      this.habilidadService.addHabilidad(addForm.value).subscribe({
        next: (response: Habilidad) => {
          console.log(response);
          this.getHabilidades();
          addForm.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          addForm.resetForm();

        }

      });
    }

  }
  public onEditHabilidad(habilidad: Habilidad): void {
    this.editHabilidad = habilidad;
    document.getElementById('edit-formacion-form');
    this.habilidadService.updateHabilidad(this.editHabilidad).subscribe({
      next: (response: Habilidad) => {
        console.log(response);
        this.getHabilidades();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }
  public onDeleteHabilidad(idHab: number): void {


    this.habilidadService.deleteHabilidad(idHab).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getHabilidades();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }
}
