import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../../../common-ui/base.component';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { HardcodedAutheticationService } from '../../../../service/security/hardcoded-authetication.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent extends BaseComponent {

  ventas: any[] = [];
  idPromotor: string | null = null;

  constructor(
      private promotoresService: PromotoresDataService,
      private authService: HardcodedAutheticationService,
      dialog: MatDialog,
      route: ActivatedRoute
    ) {
      super(dialog, route);
      this.pathVariableName = 'idEvento';

      route.parent?.parent?.params.subscribe(params => {
        this.idPromotor = params['idPromotor'];
      });

    }



  protected override cargarDatos(): void {
    if (this.pathVariable && this.idPromotor) {
      this.iniciarCarga();
      this.promotoresService.getDetalleVentas(this.idPromotor, +this.pathVariable).subscribe({
        next: (response) => {
          this.ventas = response.ventas;
          console.log(this.ventas);
          this.finalizarCarga();
        },
        error: (error) => {
          this.manejarError(error, 'Error al cargar las ventas del evento');
        }
      });
    }
  }

  totalVentas(): number {
    return this.ventas.reduce((total, venta) => total + venta?.tarifa?.precio + venta?.tarifa?.servicio + venta?.tarifa?.iva, 0);
  }


  checkEstadoVenta(estado: number){
    switch (estado) {
      case 0:
        return 'Disponible';
      case 1:
        return 'Vendida';
      case 2:
        return 'Reservada';
      case 3:
        return 'En proceso';
      case 4:
        return 'No Disponible';
      default:
        return estado;
    }
  }

  checkTipo(tipo: number){
    switch (tipo) {
      case 0:
        return 'Ticket Completo';
      case 1:
        return 'Ticket Master de Palcos Individuales';
      default:
        return tipo;
    }
  }
}
