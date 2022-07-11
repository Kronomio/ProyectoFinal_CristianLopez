import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudio } from '../model/estudio.model';

@Injectable({
  providedIn: 'root'
})
export class FormacionService {
  url=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public obtenerEstudios():Observable<Estudio[]>{
    return this.http.get<Estudio[]>(this.url +"estudio/all")
    }

  public addEstudio(estudio:Estudio):Observable<Estudio>{
    return this.http.post<Estudio>(this.url+"estudio/add", estudio);
  }

  public updateEstudio(estudio:Estudio):Observable<Estudio>{
    return this.http.put<Estudio>(this.url+"estudio/update", estudio);
  }

  public deleteEstudio(estudioId:number):Observable<void>{
    return this.http.delete<void>(`${this.url}estudio/delete/${estudioId}`);
  }
}
