import { EspecificoInterface } from "./especifico-interface";

export interface PorMunicipioInterface {
    data: EspecificoInterface[],
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number
}
