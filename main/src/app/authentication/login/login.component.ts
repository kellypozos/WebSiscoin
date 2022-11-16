import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl  } from '@angular/forms';
import { nombreNegocioPattern } from 'src/app/shared/validator/validaciones';
import { emailPattern } from 'src/app/shared/validator/validaciones';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = Object.create(null);


  miformulario: FormGroup = this.fb.group({
    correo: ['',[Validators.required, Validators.email]],
    contrasena: ['',[Validators.required, Validators.minLength(8)]],
  
  });
  campoNoValido(campo : string){
    return this.miformulario.get(campo)?.invalid && this.miformulario.get(campo)?.touched;
  }
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private cookieService: CookieService) { }

    //ALMS Modificaciones
    async onGoogleLogin(){
      try{
        let result:any = this.authSvc.loginGoogle();
        console.log(result.emailVerified);
        console.log(result.__zone_symbol__value);
        console.log(result.__zone_symbol__value);
      }
      catch(error){
        console.log(error);
      }
    }
    login(){
      console.log(this.miformulario.value);
      const{correo, contrasena} = this.miformulario.value;

      this.authSvc.login( correo, contrasena)
      .subscribe((resp:any) => {
      console.log(resp);
         if (resp.status == true){
          this.cookieService.set('cookie', resp.token,1,'/');
           this.router.navigateByUrl('/dashboard');
         }else{
         // Swal.fire('Error','credeciales no validas', 'error');
        
         } 
      });
    }
 
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: [null, Validators.compose([ Validators.required, Validators.minLength(8) ])]
    });
  }

   // emailPattern: any =
  //   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  /*  ngOnInit(): void {
     this.form = this.fb.group({
       uname: [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
       password: [null, Validators.compose([Validators.required])]
     });
   } */


  onSubmit(): void {
   // this.router.navigate(['/dashboards/dashboard1']);
  }
  /*signOut(): void {
    this.authService.signOut();
  }*/

  routeRedirect = '';

}


