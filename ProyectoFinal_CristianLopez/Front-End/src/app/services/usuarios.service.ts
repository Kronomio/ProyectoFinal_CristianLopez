import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url=environment.apiBaseUrl;
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
}
