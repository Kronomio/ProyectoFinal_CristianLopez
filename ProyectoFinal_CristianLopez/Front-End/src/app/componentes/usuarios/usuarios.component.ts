import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/model/rol.model';
import { Usuario } from 'src/app/model/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
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
    private router:Router,
    private autenticationService: AutenticacionService) { }
  faPencil = faPencilAlt;
  basuraIcono = faTrashCan;
  usuarios:Usuario[]=[];
  usuarioEdit?:Usuario;
  modo:string='';
  tituloModal:string='';
  borrarUsuario?:Usuario;
  rol?:Rol;
  nuevoRol:Rol={id:1, rolNombre:'ROLE_USER'};

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

  public onDeleteUsuario(id?:number):void{
    this.usuarioService.deleteUsuario(id!).subscribe({
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

    this.usuarioService.enviarModo(modo);
    this.modo = modo;
    
     if (modo === 'delete') {
      this.borrarUsuario = usuario;
      // button.setAttribute('data-toggle', '#deleteUsuarioModal');
    } else if (modo === 'edit') {
      this.usuarioEdit=usuario;

      this.cargarFormularioPermisosUsuario(usuario!);      
    }
    
    // container?.appendChild(button);
    // button.click();
  }


  public cargarFormularioPermisosUsuario(usuario:Usuario){

    for(let rol of usuario.roles)
    {
      if(rol.rolNombre==='ROLE_ADMIN')
      {
        $("#administradorCheck").prop("checked", true);
      }
      else if(rol.rolNombre==='ROLE_USER')
      {
        $("#usuarioStandarCheck").prop("checked", true);
      }
      else if(rol.rolNombre==='ROLE_COLLABORATOR')
      {
        $("#colaboradorCheck").prop("checked", true);

      }
      
    }   // this.usuarioService.enviarUsuario(usuario);
  }

  public onNuevoUsuario(){
    $("#cerrarUsuarios").click();
    this.router.navigate(['signup']);
  }

   public onNewUsuario(){
    this.router.navigate(['signup']);

  }
  public onRegresar()
  {
    this.router.navigate(['home']);
  }
  
  actualizarPermisos()
  {
    if($("#usuarioStandarCheck").prop('checked') )
       this.nuevoRol={id:1, rolNombre:'ROLE_USER'};

    else if($("#colaboradorCheck").prop('checked'))
    this.nuevoRol={id:1, rolNombre:'ROLE_COLLABORATOR'};
      else if($("#administradorCheck").prop('checked'))
      this.nuevoRol={id:1, rolNombre:'ROLE_ADMIN'};
       
      this.usuarioEdit?.roles.push(this.nuevoRol);
      
    this.usuarioService.updateRolesUsuario(this.usuarioEdit?.username!,this.nuevoRol).subscribe({
      next:(response:any)=>{
        //Actualizar lista
        this.getUsuarios();
        this.mensajeService.showSuccess(`Se editaron correctamente los permisos del usuario`);

      }, 
      error:(error:HttpErrorResponse)=>{
        this.mensajeService.showError(`No fué posible editar los permisos del usuario.  ${error.message}`);

      }
        
  
      

    });
   
  

  }
}
