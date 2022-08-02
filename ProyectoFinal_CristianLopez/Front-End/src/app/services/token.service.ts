import { Injectable } from '@angular/core';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

const TOKEN_KEY='AuthToken';
  const USERNAME_KEY='AuthUsername';
  const AUTORITIES_KEY='AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string>=[];
  authorities:string[]=[];
  constructor() { }

  public setToken(token: string ): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
   
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(userName:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName); 
  }
  public getUsername():string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTORITIES_KEY);
    window.sessionStorage.setItem(AUTORITIES_KEY, JSON.stringify(authorities));
    }
    public getAuthorities():string[]{
      this.roles=[];
      if(sessionStorage.getItem(AUTORITIES_KEY)!){
        JSON.parse(sessionStorage.getItem(AUTORITIES_KEY)!).forEach((authority:any) => {
          this.roles.push(authority.authority);  
        });

      }
      return this.roles;
    }
    public isAdmin():boolean{
      this.authorities=this.getAuthorities();
      for(let i=0; i<this.authorities.length; i++)
      {
        if(this.authorities[i]==='ROLE ADMIN')
        return true;
      }
      return false;
      
    }

    public logOut():void{
      window.sessionStorage.clear();

    }

  }

