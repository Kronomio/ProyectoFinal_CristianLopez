import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import{NuevoUsuario} from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  url="http://localhost:8080/auth/";
  // currentUserSubject: BehaviorSubject<any>
 
  constructor(private httpClient:HttpClient) { 
    // console.log("El servicio de autenticación está corriendo");
    // this.currentUserSubject =new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}' ));
  }

  // iniciarSesion(credenciales:any):Observable<any>{
  //   return this.httpClient.post(this.url, credenciales).pipe(map(data=>{
  //     sessionStorage.setItem('currentUser', JSON.stringify(data));
      
  //     return data;
  //   }))
  // }

  public nuevo (nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.url+'new', nuevoUsuario)  }

  public login(loginUsuario:LoginUsuario): Observable <JwtDto>{
    console.log(loginUsuario);
    return this.httpClient.post<JwtDto>(this.url+'login', loginUsuario);
  }
  
}
