import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
  AbstractControl, ValidationErrors 
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ValidatorService } from '../../shared/validator/validator.service';
//ALMS Le movi a las validaciones
const password = new FormControl('', [ Validators.required, Validators.minLength(8) ]);
const confirmPassword = new FormControl('', [CustomValidators.equalTo(password), Validators.minLength(8) ]);


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  miformulario: FormGroup = this.fb.group({
    usuario: ['',[Validators.required, Validators.min(1)]],
    correo: ['',[Validators.required, Validators.email]],
    contrasena: ['',[Validators.required, Validators.min(7)]],
    contrasena2: ['',[Validators.required, Validators.min(7)]],
  },{
    validators: [this.ValidatorService.camposIguales('contrasena','contrasena2')]
  });

  campoNoValido(campo : string){
    return this.miformulario.get(campo)?.invalid && this.miformulario.get(campo)?.touched;
  } 
  camposIguales(campo1 : string, campo2 : string){
    return (formGroup : AbstractControl): ValidationErrors | null => {
      
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
 
      if(pass1 != pass2){
        return { noIguales: true}
      }

      return null;
    }
  }

  public form: FormGroup = Object.create(null);
  //ALMS Modifique
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      // tslint:disable-next-line - Disables all
      password: password,

      // tslint:disable-next-line - Disables all
      confirmPassword: confirmPassword,

      Ename: [null, Validators.compose([ Validators.required, Validators.minLength(2) ]) ]

    });
  }

  constructor(private fb: FormBuilder, 
    private router: Router,
    private authSvc: AuthService,
    private ValidatorService : ValidatorService
    ) { }

onSubmit(): void {
  this.router.navigate(['/']);
}

register(){
  console.log(this.miformulario.value);
  const{ usuario, correo, contrasena} = this.miformulario.value;

  this.authSvc.register(usuario, correo, contrasena )
  .subscribe((resp:any) => {
  console.log(resp);
     if (resp.status == true){

      this.router.navigateByUrl('/authentication/login');
     }else{
      Swal.fire('Error','datos no validos', 'error');
    
     } 
  });

}
}