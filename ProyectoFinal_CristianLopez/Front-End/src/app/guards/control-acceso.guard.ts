import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlAccesoGuard implements CanActivate {
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.hasAdmin()){
      return true;
    }
    alert('Debes loguarte como Administrador');
    return false;
  }

  hasAdmin():boolean{
    return (window.sessionStorage.getItem('isAdmin') === 'true');
  }
  
}
