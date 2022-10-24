export interface ResultadoFiltro {
    data: DataResultadoFiltro[];
    filtros: DataFiltros[];
    message: string;
    seconds: number;
    success: number;
    tituloSugerido: number;
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
    subCategorias: [],
    entidadNombre: [],
    sector: [],
    fechaPublicacionFiltro: [],
    fechaCierreFiltro: [],
    estado: [],
    sugerenciasFiltro: [],
    tipoEntidad: [],
    nombreEstandarizado: [],
    anioPublicacionFiltro: [],
    mesPublicacionFiltro: []
}
