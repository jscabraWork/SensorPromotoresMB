import { Routes } from '@angular/router';
import { PromotoresComponent } from './promotores.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoPerfilComponent } from './eventos/evento-perfil/evento-perfil.component';
import { VentasComponent } from './eventos/evento-perfil/ventas/ventas.component';
import { VenderComponent } from './eventos/evento-perfil/vender/vender.component';
import { ReservasComponent } from './eventos/evento-perfil/reservas/reservas.component';
import { PerfilComponent } from './perfil/perfil.component';

export const promotoresRoutes: Routes = [
  {
    path: '',
    component: PromotoresComponent,
    children: [
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'eventos/evento-perfil/:idEvento',
        component: EventoPerfilComponent,
        children: [
          { path: 'vender', component: VenderComponent },
          { path: 'ventas', component: VentasComponent },
          { path: 'reservas', component: ReservasComponent },
          { path: '', redirectTo: 'vender', pathMatch: 'full' },
        ]
      },
      {
        path: 'historial',
        component: EventosComponent,
        children: [
          { path: 'vender', component: VenderComponent },
          { path: 'ventas', component: VentasComponent },
          { path: 'reservas', component: ReservasComponent },
          { path: '', redirectTo: 'vender', pathMatch: 'full' },
        ]
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
    ]
  }
];
