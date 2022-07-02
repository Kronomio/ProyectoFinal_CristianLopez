import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url=environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  //public verPersonas():Observable<any>{
   // return this.http.get("http:/localhost:8080/ver/personas");
  //}

  verPersonas(): Observable<Persona> {
    // console.log(this.url + 'ver/persona/1');
    return this.http.get<Persona>(this.url + 'ver/persona/1');
  }

  public actualizarPersona(persona:Persona):Observable<any>{
    
    return  this.http.put<any>(this.url + 'edit/persona/1',persona);
    
    
    
  }

  
}
