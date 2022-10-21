export interface FiltroBusqueda {
    filters: filter[] | null;
    pageNumber: number;
    pageSize: number;
    search: string;
    sort: string;
    seccion?: string;
}

export interface filter {
    sector?: string;
    categorias?: string;
    subcategorias?: string;
    entidadNombre?: string;
    nombreEstandarizado?: string;
    tipoEntidad?: string;
    anioPublicacion?: string;
    mesPublicacion?: string;
    estado?: string;
    fechaPublicacionFiltro?: string;
    fechaCierreFiltro?: string;
}
