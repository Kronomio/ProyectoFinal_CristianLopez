import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 

  constructor() { this.isAdmin=false; }
  isAdmin:boolean;
  ngOnInit(): void {
   
    this.isAdmin=(window.sessionStorage.getItem('isAdmin') === 'true');
  }

}
