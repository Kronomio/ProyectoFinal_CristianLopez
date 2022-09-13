import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
    constructor(private tokenService: TokenService, private router:Router) {
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let intReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            intReq = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(intReq).pipe(
            catchError(this.manejoError)
        );
    }

    manejoError(error: HttpErrorResponse)
    {
       if(error.status==401)
       {
        if(window.sessionStorage.getItem('AuthToken'))
        {
        window.sessionStorage.clear();
        window.location.href='/login';
       window.alert("Su sesión expiró. Debe loguearse nuevamente");
        }
       }
       if(error.status==403)
       {
        window.alert("No cuentas con los permisos necesarios.");
        
       
       }
       
        return throwError(error);
    }
}







