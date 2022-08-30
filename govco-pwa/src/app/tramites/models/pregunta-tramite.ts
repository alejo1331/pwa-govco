import { from } from 'rxjs';
import { Pregunta } from './pregunta';
import { Tramite } from './tramite';

export class PreguntaTramite {
    pregunta: Pregunta;
    tramites: Tramite[];
    numeroTramites: number;
}
