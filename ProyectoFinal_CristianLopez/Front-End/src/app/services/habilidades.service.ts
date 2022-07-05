import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from '../model/habilidad.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  url=environment.apiBaseUrl;
  // headers=new HttpHeaders;
 
  constructor(private http: HttpClient, private tokenService:TokenService) {
    // this.headers.set('Authorization', 'Bearer' + this.tokenService.getToken())

   }

  public obtenerHabilidad():Observable<Habilidad[]>{

    return this.http.get<Habilidad[]>(this.url +"habilidad/all");
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
