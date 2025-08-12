import { Localidad } from './localidad.model';
import { Promotor } from './promotor.model';

export class Reserva {
  id?: number;
  clienteId: string = '';
  activa: boolean = true;
  cantidad: number = 0;
  localidad!: Localidad;
  promotor!: Promotor;
}