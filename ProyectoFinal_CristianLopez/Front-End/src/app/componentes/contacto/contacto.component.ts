import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  hasAccess=false;
  constructor() { }

  ngOnInit(): void {
    this.hasAccess=(window.sessionStorage.getItem('isUser') === 'true' || window.sessionStorage.getItem('isCollaborator') === 'true' || window.sessionStorage.getItem('isAdmin') === 'true');
  }

}
