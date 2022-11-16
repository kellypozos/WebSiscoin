import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import { AuthResponse, Usuario } from '../authentication/interfaces/interfaces';
import { environment } from 'src/environments/environment'
import { Usuarios2 } from '../apps/interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.api;
  private _usuario!: Usuario;
  currentUserSubject: any;
  currentUser: any;

  datosU: Usuarios2 = {
    id_usuario: '',
    usuario: '',
    correo: ''
    
};
url: string = "http://127.0.0.1:8000/api/"

  constructor(public AfAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }
  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  async loginGoogle(){
    try{
      return this.AfAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res:any) => {
        console.log(res);
        if(res.user.emailVerified)
        { 
          this.router.navigate(['/dashboards/dashboard1']);
        }
      });
    }catch (error){
      console.log(error);
    }
  }
    
  get usuario(){
    return {...this._usuario};
  }

  getOne(id: any){
   id = localStorage.getItem('id_usuario');
  
    let direccion = this.url + "user/detail/" + id;
    console.log(direccion);
    return this.http.get<any>(direccion);
}

putUsuarios(form: Usuarios2) {
  let direccion = this.url + "user/" + form.id_usuario;
  return this.http.put<any>(direccion, form, {});
}

  login(correo:string, contrasena:string) {
    const url = `${ this.baseUrl}login`;
    const body = {correo, contrasena};
  
    return this.http.post<AuthResponse>(url, body)
    .pipe(
       tap(resp =>{
         if( resp.status){
          // localStorage.setItem('token', resp.token!);
          localStorage.setItem('usuario', resp.usuario!);
          localStorage.setItem('correo', resp.correo!);
          localStorage.setItem('id_usuario', resp.id!);
           this._usuario ={
          usuario: resp.usuario!
           }
         }
      }),
    
     ); 
  }

  register( usuario: string, correo:string, contrasena:string){
    const url = `${ this.baseUrl}register`;
    const body = { usuario, correo, contrasena};
  
    return this.http.post<AuthResponse>(url, body)
    .pipe(
       tap(resp =>{
         if( resp.status){
          localStorage.setItem('token', resp.token!);
          localStorage.setItem('usuario', resp.usuario!);
           this._usuario ={
          usuario: resp.usuario!
           }
         }
      }),
    
     );
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string) {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged) {
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}