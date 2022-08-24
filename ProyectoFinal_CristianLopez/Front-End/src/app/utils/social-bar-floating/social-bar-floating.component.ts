import { Component, Input, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';

@Component({
  selector: 'app-social-bar-floating',
  templateUrl: './social-bar-floating.component.html',
  styleUrls: ['./social-bar-floating.component.css']
})
export class SocialBarFloatingComponent implements OnInit {

  @Input() persona?:Persona; 
  constructor() { }

  ngOnInit(): void {
  }

}
