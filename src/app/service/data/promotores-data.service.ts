import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CommonDataService } from '../commons/common-data.service';
import { API_URL_PROMOTORES } from '../../app.constants';
import { Promotor } from '../../models/promotor.model';

@Injectable({
  providedIn: 'root'
})
export class PromotoresDataService extends CommonDataService<Promotor>{

  protected override baseEndpoint = API_URL_PROMOTORES + "/promotores";

  endpointEventos = API_URL_PROMOTORES + "/eventos";

  endpointPromotores = API_URL_PROMOTORES + "/promotores";

  endpointReservas = API_URL_PROMOTORES + "/reservas";

  protected override atributoListado= 'evento';

  getPromotorByNumeroDocumento(numeroDocumento: string): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/${numeroDocumento}`);
  }

  //Obtiene la lista de eventos no terminados del promotor
  //Ademas trae el objeto promotor
  getEventosActivos(numeroDocumento: string): Observable<any> {
    return this.http.get<any>(`${this.endpointEventos}/activos-promotor/${numeroDocumento}`);
  }

  //Obtiene la lista de eventos terminados del promotor
  //Ademas trae el objeto promotor
  getEventosHistorial(numeroDocumento: string): Observable<any> {
    return this.http.get<any>(`${this.endpointEventos}/historial-promotor/${numeroDocumento}`);
  }

  //-- MÉTODOS VENTAS Y RESERVAS --//

  //Obtiene el evento junto con sus dias
  getEventoPerfil(eventoId: number): Observable<any> {
    return this.http.get<any>(`${this.endpointEventos}/perfil/${eventoId}`);
  }

  getDetalleVentas(idPromotor: string, idEvento: number): Observable<any> {
    return this.http.get<any>(`${this.endpointPromotores}/ventas/${idPromotor}/eventos/${idEvento}`);
  }

  getReservas(idPromotor: string, idEvento: number) {
  const params = new HttpParams()
    .set('pPromotorId', idPromotor)
    .set('pEventoId', idEvento);
   return this.http.get<any>(`${this.endpointReservas}/listar/evento`, { params });
}




}
