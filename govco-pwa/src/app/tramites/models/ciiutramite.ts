import { CodigoCIIU } from './codigo-ciiu';
import { Tramite } from './tramite';

export class CIIUTramite {
    Id: number;
    FechaModificacion: Date;
    IdCiiu: number;
    CodigoCIIU: CodigoCIIU;
    IdTramite: string;
    tramite: Tramite;
}
