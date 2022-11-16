import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

constructor(private cookieService: CookieService, private router: Router){

}

redirect(flag: boolean): any{
  if(!flag){
    this.router.navigate(['/authentication/login'])
  }
}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('cookie');
    this.redirect(cookie)
    //console.log(cookie);
    return true
    }
  
}
