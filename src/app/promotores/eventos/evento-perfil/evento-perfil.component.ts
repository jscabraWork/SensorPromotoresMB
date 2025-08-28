import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { NavegacionComponent } from '../../../common-ui/navegacion/navegacion.component';

@Component({
  selector: 'app-evento-perfil',
  standalone: true,
  imports: [RouterOutlet, NavegacionComponent],
  templateUrl: './evento-perfil.component.html',
  styleUrl: './evento-perfil.component.scss'
})
export class EventoPerfilComponent implements OnInit {
  idEvento: string = '';
  idPromotor: string = '';
  
  menuItems = [
    { path: 'vender', label: 'Reservar' },
    { path: 'ventas', label: 'Detalle de Ventas' },
    { path: 'reservas', label: 'Reservas' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idEvento = params['idEvento'];
    });

    this.route.parent?.parent?.params.subscribe(params => {
      this.idPromotor = params['idPromotor'];
    });
  }

  onMenuItemClick() {
    // Handle menu item click if needed
  }
}
