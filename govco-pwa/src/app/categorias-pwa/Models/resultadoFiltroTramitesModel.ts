export interface ResultadoFiltroTramites {
    data: DataResultadoFiltro[];
    filtros: DataFiltros[];
    message: string;
    seconds: number;
    success: number;
    tituloSugerido: string | null;
    total: number;
}

export interface DataResultadoFiltro {
    link: string;
    linkEntidad: string;
    orden: string;
    titulo: string;
}

export interface DataFiltros {
    categorias: [],
    subcategorias: [],
    entidadNombre: [],
    sector: [],
    fechaPublicacionFiltro: [],
    fechaCierreFiltro: [],
    estado: [],
    sugerenciasFiltro: [],
    tipoEntidad: [],
    nombreEstandarizado: [],
    anioPublicacionFiltro: [],
    mesPublicacionFiltro: [],
    departamento: { codigoDepartamento: number }
    municipio : { codigoMunicipio: number }
}
