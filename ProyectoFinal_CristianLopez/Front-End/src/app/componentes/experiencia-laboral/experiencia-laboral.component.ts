import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      delay: 0,
      offset: 500,
      duration: 3000
    });
  }

}
