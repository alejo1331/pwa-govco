import { CarruselUnoInterface1 } from "./carrusel-uno-interface-1";

export interface CarruselUnoInterface {
    data: CarruselUnoInterface1[],
    succeeded: boolean,
    errors: string|null,
    message: string|null,
    totalRegistros: number;
}
