import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Experiencia} from '../model/experiencia.model'; 
@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  url=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerExperiencias():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.url +"experiencia/all")
    }

  public addExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(this.url+"experiencia/add", experiencia);
  }

  public updateExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(this.url+"experiencia/update", experiencia);
  }

  public deleteExperiencia(experienciaId:number):Observable<void>{
    return this.http.delete<void>(`${this.url}experiencia/delete/${experienciaId}`);
  }
}
