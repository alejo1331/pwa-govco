export interface FiltroBusqueda {
    filters: Filter | null;
    pageNumber: number;
    pageSize: number;
    search: string;
    sort: string;
    seccion?: string;
    spinner?: boolean;
}

export interface Filter {
    categorias?: Name;
    subcategorias?: Name;
    entidadNombre?: string;
    sector?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacionFiltro?: string;
    mesPublicacionFiltro?: string;
    estado?: string;
    departamento: { codigoDepartamento: number } | null;
    municipio: { codigoMunicipio: number } | null;
}

export interface FilterMordal {
    categorias?: Name;
    subcategorias?: Name;
    entidadNombre?: string;
    sector?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacionFiltro?: string;
    mesPublicacionFiltro?: string;
    estado?: string;
}

export interface Name {
    nombre: string;
}
