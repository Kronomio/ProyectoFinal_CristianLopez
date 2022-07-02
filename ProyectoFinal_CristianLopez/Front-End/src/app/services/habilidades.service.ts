import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../model/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  url=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public obtenerHabilidad():Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>(this.url +"habilidad/all")
    }

  public addHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.post<Habilidad>(this.url+"habilidad/add", habilidad);
  }

  public updateHabilidad(habilidad:Habilidad):Observable<Habilidad>{
    return this.http.put<Habilidad>(this.url+"habilidad/update", habilidad);
  }

  public deleteHabilidad(habilidadId:number):Observable<void>{
    return this.http.delete<void>(`${this.url}habilidad/delete/${habilidadId}`);
  }
}
