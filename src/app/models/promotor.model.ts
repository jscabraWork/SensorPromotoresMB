import { Generic } from '../service/commons/generic.model';
import { Evento } from './evento.model';
import { Usuario } from "./usuario.model";

export class Promotor implements Generic {
    id?:string;
    nombre: string = '';
    numeroDocumento: string = '';
    correo: string = '';
    celular: string = '';
    eventos: Evento[] = [];
}
