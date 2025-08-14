import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservasDataService } from '../../../../../service/data/reservas-data.service';
import { Reserva } from '../../../../../models/reserva.model';

@Component({
  selector: 'app-reserva-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-modal.component.html',
  styleUrl: './reserva-modal.component.scss'
})
export class ReservaModalComponent implements OnInit {

  clienteId: string = '';
  cargando: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      localidad: any,
      cantidad: number,
      total: number,
      promotorId: string
    },
    private dialogRef: MatDialogRef<ReservaModalComponent>,
    private reservasService: ReservasDataService
  ) {}

  ngOnInit(): void {
    // Focus al input después de que se renderice el modal
    setTimeout(() => {
      const input = document.querySelector('.form-input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 300);
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

  onConfirmar(): void {
    if (!this.clienteId || this.clienteId.trim().length === 0) {
      return;
    }

    this.cargando = true;

    const reserva = new Reserva();
    reserva.clienteId = this.clienteId.trim();
    reserva.cantidad = this.data.cantidad;
    reserva.activa = true;

    console.log(this.data)

    // Obtener la primera localidad de los días de la localidad seleccionada
    const localidadId = this.data.localidad.id;

    if (!localidadId) {
      this.dialogRef.close({
        success: false,
        message: 'Error: No se pudo obtener el ID de la localidad'
      });
      return;
    }

    this.reservasService.crearReserva(reserva, localidadId, this.data.promotorId).subscribe({
      next: (response) => {
        console.log(response)
        this.dialogRef.close({
          success: true,
          message: `Reserva creada exitosamente para ${this.data.cantidad} boleta(s) de ${this.data.localidad.nombre}`,
          data: response
        });
      },
      error: (error) => {
        console.error('Error al crear reserva:', error);
        this.dialogRef.close({
          success: false,
          message: error.error?.message || 'Error al crear la reserva. Intente nuevamente.'
        });
      }
    });
  }
}
