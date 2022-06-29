import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url:String='http://localhost:8080/';
  
  constructor(private http: HttpClient) { }


  public verPersona():Observable<persona>{
  //  console.log(this.url+'ver/personas');
    return this.http.get<persona>(`${this.url}ver/personas`);
    
  }
}
