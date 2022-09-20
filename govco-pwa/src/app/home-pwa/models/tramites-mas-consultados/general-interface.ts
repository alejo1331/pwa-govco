import { EspecificoInterface } from "./especifico-interface";

export interface GeneralInterface {
    data: EspecificoInterface[],
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number;
}

