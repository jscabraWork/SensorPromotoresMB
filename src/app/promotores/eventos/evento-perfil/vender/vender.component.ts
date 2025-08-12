import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { Evento } from '../../../../models/evento.model';
import { Dia } from '../../../../models/dia.model';
import { BaseComponent } from '../../../../common-ui/base.component';
import { SeleccionLocalidadComponent } from './seleccion-localidad/seleccion-localidad.component';

@Component({
  selector: 'app-vender',
  standalone: true,
  imports: [CommonModule, FormsModule, SeleccionLocalidadComponent],
  templateUrl: './vender.component.html',
  styleUrl: './vender.component.scss'
})
export class VenderComponent extends BaseComponent {
  
  evento: Evento = new Evento();
  dias: Dia[] = [];

  constructor(
    private promotoresService: PromotoresDataService,
    dialog: MatDialog,
    route: ActivatedRoute
  ) {
    super(dialog, route);
    this.pathVariableName = 'idEvento';
  }

  protected override cargarDatos(): void {
    if (this.pathVariable) {
      this.iniciarCarga();
      this.promotoresService.getEventoPerfil(+this.pathVariable).subscribe({
        next: (response) => {
          this.evento = response.evento;
          this.dias = response.dias.sort((a: Dia, b: Dia) => a.fechaInicio.localeCompare(b.fechaInicio));
          this.finalizarCarga();
        },
        error: (error) => {
          this.manejarError(error, 'Error al cargar el perfil del evento');
        }
      });
    }
  }

  getImagenPrincipal(evento: Evento): string | null {
    if (!evento.imagenes || evento.imagenes.length === 0) {
      return null;
    }

    const imagenPrincipal = evento.imagenes.find(imagen => imagen.tipo === 1);
    return imagenPrincipal?.url || null;
  }

  onReservar(event: {localidad: any, cantidad: number}): void {
    this.mostrarMensaje(`Reservando ${event.cantidad} boleta(s) de ${event.localidad.nombre}. Funcionalidad próximamente.`);
  }
}
