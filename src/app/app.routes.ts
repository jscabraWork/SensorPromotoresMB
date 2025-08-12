
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

import { Routes } from '@angular/router';
import { RouteGuardPromotorService } from './service/security/route-guard/rout-guard-promotor.service';

export const routes: Routes = [

  {
    path: 'promotor/:idPromotor',
    loadChildren: () =>
      import('./promotores/promotores.module').then((m) => m.PromotoresModule),
    canActivate: [RouteGuardPromotorService],
  },

  {
    path: '',
    component: LoginComponent,
  },{
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardPromotorService],
  },

  {
    path: '**',
    component: ErrorComponent,
  },
];
