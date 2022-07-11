import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";

export class ValidadorPersonalizado {

    static confirmacionContraseña(password2: AbstractControl | null) {


        return (control: AbstractControl) => {

            password2?.valueChanges.subscribe(value => {
                if (control.value != value || password2 == null && control.value != null) {

                    return { confirmacionContraseña: true }
                }
                else

                    return null;
            });

            if (control.value != password2?.value || password2 == null && control.value != null)
                return { confirmacionContraseña: true }
            else

                return null;
        }
    }
    static validarEmail(autenticationService: any): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
          return autenticationService
            .checkEmail(control.value)
            .pipe(
              map((isDisponible) => !isDisponible ? null : { validarEmail: true }
              )
            );
        }
      }
      
      static validarUsername(autenticationService: any): AsyncValidatorFn {
      
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
      
          return autenticationService
            .checkUsername(control.value)
            .pipe(
              map((isDisponible) => !isDisponible ? null : { validarUsername: true }
              )
            );
        }
      }
    


}
