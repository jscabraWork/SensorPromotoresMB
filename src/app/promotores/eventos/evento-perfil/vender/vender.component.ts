import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromotoresDataService } from '../../../../service/data/promotores-data.service';
import { AuthService } from '../../../../service/security/auth.service';
import { Evento } from '../../../../models/evento.model';
import { Dia } from '../../../../models/dia.model';
import { BaseComponent } from '../../../../common-ui/base.component';
import { SeleccionLocalidadComponent } from './seleccion-localidad/seleccion-localidad.component';
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';
import { HardcodedAutheticationService } from '../../../../service/security/hardcoded-authetication.service';

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
    private authService: HardcodedAutheticationService,
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

  onReservar(event: {localidad: any, cantidad: number, total: number}): void {
    const dialogRef = this.dialog.open(ReservaModalComponent, {
      width: '500px',
      disableClose: true,
      data: {
        localidad: event.localidad,
        cantidad: event.cantidad,
        total: event.total,
        promotorId: this.authService.getCC()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.success && result.data) {
          const reservaId = result.data.id;
          const linkReserva = `https://ticketsensor.com/reserva/${reservaId}`;
          const mensajeCompleto = `${result.message}\n\nLink de la reserva:\n${linkReserva}`;
          this.mostrarMensaje(mensajeCompleto);
        } else {
          this.mostrarMensaje(result.message);
        }
      }
    });
  }
}
