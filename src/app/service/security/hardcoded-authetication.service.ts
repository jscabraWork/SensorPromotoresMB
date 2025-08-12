
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAutheticationService {
  constructor(private http: HttpClient) {}


  getUsuario() {
    return sessionStorage.getItem('usuario');
  }

  getCC() {
    return sessionStorage.getItem('cc');
  }
  getNombre() {
    return sessionStorage.getItem('nombre');
  }

  getPromotor() {
    return sessionStorage.getItem('promotor');
  }

  usuarioLoggin() {
    let usuario = sessionStorage.getItem('usuario');
    return !(usuario == null);
  }

  promotorLoggin() {
    let usuario = sessionStorage.getItem('promotor');
    return !(usuario == null);
  }

  logout() {
    sessionStorage.removeItem('usuarioEntidad');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('promotor');
  }
}
