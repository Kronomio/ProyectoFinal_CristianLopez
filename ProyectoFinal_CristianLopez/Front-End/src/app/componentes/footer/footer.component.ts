import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() persona?:Persona;
  constructor() { }

  ngOnInit(): void {
  }

}
