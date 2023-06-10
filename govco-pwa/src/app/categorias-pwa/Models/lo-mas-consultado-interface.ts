export interface BaseInterface {
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number
}

export interface TituloInterface {
    data: {
        id: number,
        seccion: string,
        titulo: string
    },
    base: BaseInterface
}

export interface LoMasConsultado {
    data: {
        iconoCategoria: string,
        id: string,
        nombre: string
    }[],
    base: BaseInterface
}

export interface EspecificoInterface {
    id: string,
    nombre: string,
    iconoCategoria: string
}

export interface PorMunicipioInterface {
    data: EspecificoInterface[],
    succeeded: boolean,
    errors: string | null,
    message: string | null,
    totalRegistros: number
}

export interface MasConsultadoI {
    link: string,
    titulo: string
  }
  
  export interface UbicacionI {
    codigoDepartamento: string,
    codigoMunicipio: string,
    nombreMunicipio: string
  }
  