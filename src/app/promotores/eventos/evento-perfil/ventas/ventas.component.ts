import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../../../common-ui/base.component';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { HardcodedAutheticationService } from '../../../../service/security/hardcoded-authetication.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TablaOrganizadoresComponent, ColumnaTabla } from '../../../../common-ui/tabla-organizadores/tabla-organizadores.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, TablaOrganizadoresComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent extends BaseComponent {

  ventas: any[] = [];
  idPromotor: string | null = null;
  estadisticas = {
    totalVentas: 0,
    totalTicketsVendidos: 0,
    totalTicketsReservados: 0,
    totalVendido: 0,
  };

  columnasTabla: ColumnaTabla[] = [
    { key: 'id', label: 'ID', tipo: 'texto', alineacion: 'center' },
    { key: 'estado', label: 'Estado', tipo: 'texto', alineacion: 'center' },
    { key: 'tipo', label: 'Tipo', tipo: 'texto', alineacion: 'center' },
    { key: 'numero', label: 'Número', tipo: 'texto', alineacion: 'center' },
    { key: 'tarifa.nombre', label: 'Etapa', tipo: 'texto', alineacion: 'center' },
    { key: 'precioTotal', label: 'Tarifa', tipo: 'moneda', alineacion: 'right' },
    { key: 'localidad', label: 'Localidad', tipo: 'texto', alineacion: 'center' }
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
      this.promotoresService.getDetalleVentas(this.idPromotor, +this.pathVariable).subscribe({
        next: (response) => {
          this.ventas = this.procesarVentas(response.ventas);
          this.calcularEstadisticas();
          console.log(this.ventas);
          this.finalizarCarga();
        },
        error: (error) => {
          this.manejarError(error, 'Error al cargar las ventas del evento');
        }
      });
    }
  }

  private procesarVentas(ventas: any[]): any[] {
    return ventas.map(venta => ({
      ...venta,
      estado: this.checkEstadoVenta(venta.estado),
      tipo: this.checkTipo(venta.tipo),
      numero: venta.numero ?? 'Sin numeración',
      precioTotal: (venta?.tarifa?.precio || 0) + (venta?.tarifa?.servicio || 0) + (venta?.tarifa?.iva || 0)
    }));
  }

  private calcularEstadisticas(): void {
    this.estadisticas.totalVentas = this.ventas.length;
    
    // Solo contar tickets vendidos (estado 1)
    const ticketsVendidos = this.ventas.filter(venta => venta.estado === 'Vendida');
    this.estadisticas.totalTicketsVendidos = ticketsVendidos.length;
    
    // Solo contar tickets reservados (estado 2) 
    this.estadisticas.totalTicketsReservados = this.ventas.filter(venta => venta.estado === 'Reservada').length;
    
    // Solo sumar ingresos de tickets vendidos
    this.estadisticas.totalVendido = ticketsVendidos.reduce((total, venta) => total + venta.precioTotal, 0);
    
  }

  totalVentas(): number {
    return this.estadisticas.totalVendido;
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
