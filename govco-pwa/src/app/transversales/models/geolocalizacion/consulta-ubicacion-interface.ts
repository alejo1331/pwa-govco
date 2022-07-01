import { MunicipioInterface } from "./municipio-interface";

export interface ConsultaUbicacionInterface {
    codigoDepartamento: string;
    codigoMunicipio: string;
    municipios: MunicipioInterface[];
}
