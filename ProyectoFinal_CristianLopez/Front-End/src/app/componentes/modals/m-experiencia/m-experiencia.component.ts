import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia.model';

@Component({
  selector: 'app-m-experiencia',
  templateUrl: './m-experiencia.component.html',
  styleUrls: ['./m-experiencia.component.css']
})
export class MExperienciaComponent implements OnInit {

  @Input() experiencia!:Experiencia;
  constructor() { }

 
  ngOnInit(): void {
  }

}
