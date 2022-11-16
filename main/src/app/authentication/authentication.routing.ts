import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: ErrorComponent,
        data: {
          title: 'Smart Commerce'
        }
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        data: {
          title: 'Smart Commerce'
        }
      },
      {
        path: 'lockscreen',
        component: LockscreenComponent,
        data: {
          title: 'Smart Commerce'
        }
      },
      {
        path: 'login',
        component: LoginComponent

      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Smart Commerce'
        }
      }
    ]
  }
];
