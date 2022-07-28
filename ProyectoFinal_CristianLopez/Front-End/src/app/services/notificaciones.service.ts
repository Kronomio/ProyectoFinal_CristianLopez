import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  constructor(private toast: NgToastService) { }

 
  showSuccess(mensaje:string) {
    this.toast.success({detail:"Éxito",summary:mensaje,position:'bl' ,duration:5000});
  }
  
  showError(mensaje:string) {
    this.toast.error({detail:"Error",summary:mensaje,position:'bl',sticky:true});
  }

  showInfo(mensaje:string) {
    this.toast.info({detail:"INFO",summary:mensaje,position:'bl',sticky:true});
  }

  showWarn(mensaje:string) {
    this.toast.warning({detail:"WARN",summary:mensaje,position:'bl',duration:5000});
  }
}
