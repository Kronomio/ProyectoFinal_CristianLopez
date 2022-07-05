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

  constructor() { }

  public setToken(token: string ): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token+" DE +"+TOKEN_KEY);
  }

  public getToken():string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setUserName(userName:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
    console.log(userName+" DE +"+USERNAME_KEY);

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

    public logOut():void{
      window.sessionStorage.clear();

    }

  }

