import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/model/rol.model';
import { Usuario } from 'src/app/model/usuario.model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService:UsuariosService, 
    private mensajeService: NotificacionesService,
    private router:Router) { }
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  usuarios:Usuario[]=[];
  modo:string='';
  tituloModal:string='';
  borrarUsuario?:Usuario;
  rol?:Rol;
  ngOnInit(): void {
    this.getUsuarios();
   
  }

  public getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (Response: Usuario[]) => {
        this.usuarios = Response;
        
      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`${error.message}`);
      
      }
    })
  }

  public deleteUsuario(id:number):void{
    this.usuarioService.deleteUsuario(id).subscribe({
      next: (response: void) => {
        // console.log(response);
        this.mensajeService.showWarn(`Se eliminó el Usuario`)

        this.getUsuarios();

      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`No se pudo eliminar el usuario. ${error.message}`);
       
      }
    });
  }

  public updateUsuario(usuario:Usuario):void{
    this.usuarioService.updateUsuario(usuario).subscribe({
      next: (response: void) => {
        // console.log(response);
        this.mensajeService.showWarn(`Se actualizó el Usuario ${usuario.nombre}`);

        this.getUsuarios();

      },
      error: (error: HttpErrorResponse) => {
        this.mensajeService.showError(`No se pudo actualizar el usuario. ${error.message}`);
       
      }
    });
  }

  public abrirModal(modo: string, usuario?: Usuario): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.modo = modo;
    if (modo === 'add') {
      this.tituloModal = "Registrar Nuevo Usuario";
    } else if (modo === 'delete') {
      this.borrarUsuario = usuario;
      button.setAttribute('data-toggle', '#deleteUsuarioModal');
    } else if (modo === 'edit') {
      this.tituloModal = "Editar Usuario";
      this.cargarFormularioUsuario(usuario!);      
    }
    
    container?.appendChild(button);
    button.click();
  }


  public cargarFormularioUsuario(usuario:Usuario){}

  public onNuevoUsuario(){
    $("#cerrarUsuarios").click();
    this.router.navigate(['signup']);
  }

  public onEditUsuario(usuario:Usuario){

    

  }
}
