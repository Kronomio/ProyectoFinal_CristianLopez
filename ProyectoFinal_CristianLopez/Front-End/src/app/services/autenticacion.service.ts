import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import{NuevoUsuario} from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';

import { ChangePasswordUsuario } from '../model/change-password';
import { Usuario } from '../model/usuario.model';
import { Rol } from '../model/rol.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url=environment.apiBaseUrl+"auth/";
  currentUserSubject: BehaviorSubject<any>

 
 
  constructor(private httpClient:HttpClient) { 
    //console.log("El servicio de autenticación está corriendo");
    this.currentUserSubject =new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}' ));
  }

  iniciarSesion(credenciales:any):Observable<any>{
    return this.httpClient.post(this.url+'login', credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      //console.log(data);
      return data;
    }))
  }

  get UsuarioAuntenticado()
  {
    return this.currentUserSubject.value;
  }
  public nuevo (nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.httpClient.post(this.url+'new', nuevoUsuario);
  }
  public updateUsuario(usuario:Usuario):Observable<any>{
    return this.httpClient.post(this.url+'updateUsuario', usuario);
  }


  public login(loginUsuario:LoginUsuario): Observable <JwtDto>{
   // console.log(loginUsuario);
    return this.httpClient.post<JwtDto>(this.url+'login', loginUsuario);
  }
  
  public checkEmail(mail:string): Observable<any>{
     
    return this.httpClient.get(this.url + 'existEmail?email=' + mail)

  }

  public checkUsername(username:string): Observable<any>{
     
    return this.httpClient.get(this.url + 'existUsername?username=' + username)
  }

  public updatePassword(changePassword:ChangePasswordUsuario): Observable <any>{
    
    return this.httpClient.post<String>(this.url + 'updatePassword', changePassword)

  }

  
}
