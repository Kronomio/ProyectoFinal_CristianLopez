import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url=environment.apiBaseUrl;
  
  constructor(private http: HttpClient, private tokenService:TokenService) { }

  //public verPersonas():Observable<any>{
   // return this.http.get("http:/localhost:8080/ver/personas");
  //}

  verPersonas(): Observable<Persona> {
    // console.log(this.url + 'ver/persona/1');
    let headers=new HttpHeaders().set('Authorization', 'Bearer' + this.tokenService.getToken())
console.log(headers);
    return this.http.get<Persona>(this.url + 'ver/persona/1');
  }

  public actualizarPersona(persona:Persona, ):Observable<any>{
    let headers=new HttpHeaders().set('Authorization', 'Bearer' + this.tokenService.getToken())
    return  this.http.put<any>(this.url + 'edit/persona/1',persona);
    
    
    
  }

  
}
