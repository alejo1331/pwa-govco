import { DataTarjetasInterface } from "./data-tarjetas-interface";

export interface CarruselUnoInterface {
    dataTitulo: string,
    dataTramites: DataTarjetasInterface[],
    ubicacion: string,
    codigoMunicipio: string
}
