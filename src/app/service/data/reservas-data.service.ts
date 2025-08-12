import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Reserva } from '../../models/reserva.model';
import { CommonDataService } from '../commons/common-data.service';
import { API_URL_PROMOTORES } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ReservasDataService extends CommonDataService<Reserva>{

  protected override baseEndpoint = API_URL_PROMOTORES + "/reservas";

  /**
   * Crear una nueva reserva con localidad y promotor
   * @param reserva - Datos de la reserva
   * @param localidadId - ID de la localidad
   * @param promotorId - ID del promotor
   * @returns Observable con la respuesta del servidor
   */
  crearReserva(reserva: Reserva, localidadId: number, promotorId: string): Observable<any> {
    const params = new HttpParams()
      .set('pLocalidadId', localidadId.toString())
      .set('pPromotorId', promotorId);
    return this.http.post<any>(`${this.baseEndpoint}/crear`, reserva, { params });
  }

  /**
   * Obtener reservas activas por evento y promotor
   * @param eventoId - ID del evento
   * @param promotorId - ID del promotor
   * @returns Observable con la lista de reservas activas
   */
  findActivasByEventoAndPromotor(eventoId: number, promotorId: string): Observable<any> {
    const params = new HttpParams()
      .set('pEventoId', eventoId.toString())
      .set('pPromotorId', promotorId);
    
    return this.http.post<any>(`${this.baseEndpoint}/activas`, null, { params });
  }
}
