import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  public nombreNegocioPattern: string = '([a-zA-Z0-9]+))';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$";
  public productoPattern: string = "/^[a-zA-Z]/";
  public cantidadPattern: number = 0 - 9;


  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }
    return null;
  }
  camposIguales(campo1: string, campo2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      }



      formGroup.get(campo2)?.setErrors(null);

      return null
    }

  }
}
