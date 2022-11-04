export interface FiltroBusqueda {
    filters: filter | null;
    pageNumber: number;
    pageSize: number;
    search: string;
    sort: string;
    seccion?: string;
    spinner?: boolean;
}

export interface filter {
    sector?: string;
    categorias?: name;
    subcategorias?: name;
    entidadNombre?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacion?: string;
    mesPublicacion?: string;
    estado?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
}

export interface name {
    nombre: string;
}
