import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  url=environment.apiBaseUrl;


  constructor(private http: HttpClient) { }
  public obtenerProyectos():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.url +"proyecto/all")
    }

  public addProyecto(proyecto:Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(this.url+"proyecto/add", proyecto);
  }

  public updateProyecto(proyecto:Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(this.url+"proyecto/update", proyecto);
  }

  public deleteProyecto(proyectoId:number):Observable<void>{
    return this.http.delete<void>(`${this.url}proyecto/delete/${proyectoId}`);
  }
}
