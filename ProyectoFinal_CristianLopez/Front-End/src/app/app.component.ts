import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoFinal_CristianLopez';
  ngOnInit(): void {
    AOS.init({
      once: true,
      offset: 500,
      duration:50,
      anchorPlacement: 'bottom-bottom'
      
    });
  }
}
