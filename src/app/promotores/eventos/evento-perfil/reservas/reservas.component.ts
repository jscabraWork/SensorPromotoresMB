import { Component } from '@angular/core';
import { BaseComponent } from '../../../../common-ui/base.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { HardcodedAutheticationService } from '../../../../service/security/hardcoded-authetication.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TablaOrganizadoresComponent, ColumnaTabla } from '../../../../common-ui/tabla-organizadores/tabla-organizadores.component';
import { Reserva } from '../../../../models/reserva.model';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, TablaOrganizadoresComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent extends BaseComponent {

    reservas: any[] = [];
    idPromotor: string | null = null;
    estadisticas = {
      reservasActivas: 0,
      reservasInactivas: 0,
      ticketsActivos: 0,
      ticketsInactivos: 0,
      ingresosPotenciales: 0
    };

    columnasTabla: ColumnaTabla[] = [
      { key: 'id', label: 'ID Reserva', tipo: 'texto', alineacion: 'center' },
      { key: 'creationDate', label: 'Fecha Creación', tipo: 'fecha', alineacion: 'center' },
      { key: 'cantidad', label: 'Tickets', tipo: 'texto', alineacion: 'center' },
      { key: 'localidad.nombre', label: 'Localidad', tipo: 'texto', alineacion: 'center' },
      { key: 'precioTotal', label: 'Precio Total', tipo: 'moneda', alineacion: 'right' },
      { key: 'clienteId', label: 'Cliente ID', tipo: 'texto', alineacion: 'center' },
      { key: 'estadoTexto', label: 'Estado', tipo: 'texto', alineacion: 'center' },
      { key: 'linkReserva', label: 'Link', tipo: 'custom', alineacion: 'center' }
    ];

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
            console.log(response);
            this.reservas = this.procesarReservas(response.reservas);
            this.calcularEstadisticas();
            console.log(this.reservas);
            this.finalizarCarga();
          },
          error: (error) => {
            this.manejarError(error, 'Error al cargar las reservas del evento');
          }
        });
      }
    }

    private procesarReservas(reservas: any[]): any[] {
      return reservas.map(reserva => ({
        ...reserva,
        linkReserva: `https://ticketsensor.com/reservas/${reserva.id}`,
        estadoTexto: reserva.activa ? 'Activa' : 'Inactiva',
        precioTotal: this.calcularPrecioTotal(reserva)
      }));
    }

    private calcularPrecioTotal(reserva: Reserva): number {
      const tarifa = reserva.localidad.tarifa;
      if (!tarifa) return 0;
      return (tarifa.precio || 0) + (tarifa.servicio || 0) + (tarifa.iva || 0) * reserva.cantidad;
    }

    private calcularEstadisticas(): void {
      const reservasActivas = this.reservas.filter(reserva => reserva.activa);
      const reservasInactivas = this.reservas.filter(reserva => !reserva.activa);
     
    }

    abrirReserva(reserva: any): void {
      window.open(reserva.linkReserva, '_blank');
    }

    async copiarLink(link: string): Promise<void> {
      try {
        await navigator.clipboard.writeText(link);
        this.mostrarMensaje('Link copiado al portapapeles');
      } catch (err) {
        // Fallback para navegadores que no soportan clipboard API
        this.copiarLinkFallback(link);
      }
    }

    private copiarLinkFallback(link: string): void {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.mostrarMensaje('Link copiado al portapapeles');
      } catch (err) {
        this.mostrarMensaje('Error al copiar el link');
      } finally {
        document.body.removeChild(textArea);
      }
    }

    trackReserva(index: number, reserva: any): any {
      return reserva.id;
    }

}
