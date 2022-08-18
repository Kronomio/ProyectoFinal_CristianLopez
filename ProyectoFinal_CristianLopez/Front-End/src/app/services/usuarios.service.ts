import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { environment } from 'src/environments/environment';
import { Rol } from '../model/rol.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url=environment.apiBaseUrl;
  usuario?: Usuario;
  modo:string='add'
  private enviarUsuarioSubject = new Subject <Usuario>();
  private enviarModoSubject=new Subject<string>();
  enviarUsuarioObservable=this.enviarUsuarioSubject.asObservable();
  enviarModoObservable=this.enviarModoSubject.asObservable();
  constructor(private http: HttpClient) { }

  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url +"auth/getUsuarios")
    }
public updateUsuario(usuario:Usuario):Observable<void>{
  return this.http.put<void>(`${this.url}auth/updateUsuario`, usuario);
}
    public deleteUsuario(id:number):Observable<void>{
      return this.http.delete<void>(`${this.url}auth/deleteUsuario/${id}`);
    }

    public updateRolesUsuario(username:string, rol:Rol):Observable<any>{
      return this.http.put<void>(this.url+'auth/updateRoles/'+username,rol.rolNombre);
    }
  public enviarUsuario(usuario:Usuario)
  {
    this.usuario=usuario;
    
    this.enviarUsuarioSubject.next(usuario);
   
  }
  public enviarModo(modo:string)
  {
    this.modo=modo;
    this.enviarModoSubject.next(modo);
  }
}
