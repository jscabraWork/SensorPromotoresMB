import { Component } from '@angular/core';
import { BaseComponent } from '../../../../common-ui/base.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { HardcodedAutheticationService } from '../../../../service/security/hardcoded-authetication.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent extends BaseComponent {

    reservas: any[] = [];
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
        this.promotoresService.getReservas(this.idPromotor, +this.pathVariable).subscribe({
          next: (response) => {
            this.reservas = response.reservas;
            this.finalizarCarga();
          },
          error: (error) => {
            this.manejarError(error, 'Error al cargar las reservas del evento');
          }
        });
      }
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
