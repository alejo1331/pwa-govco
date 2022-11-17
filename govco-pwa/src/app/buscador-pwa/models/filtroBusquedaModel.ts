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
    categorias?: name;
    subcategorias?: name;
    entidadNombre?: string;
    sector?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacion?: string;
    mesPublicacion?: string;
    estado?: string;
    departamento: { codigoDepartamento: number } | null;
    municipio: { codigoMunicipio: number } | null;
}

export interface filterMordal {
    categorias?: name;
    subcategorias?: name;
    entidadNombre?: string;
    sector?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacion?: string;
    mesPublicacion?: string;
    estado?: string;
}

export interface name {
    nombre: string;
}
