export const DATA_FILTRO_SECCIONES = {
  tramite: [
    { id: 'categorias', nombre: 'Categoría' },
    { id: 'subcategorias', nombre: 'Subcategoría', padre: 'categorias' },
    { id: 'entidadNombre', nombre: 'Entidad' },
    { id: 'sector', nombre: 'Sector' },
    { id: 'nombreEstandarizado', nombre: 'Trámite estándar' },
  ],
  entidad: [
    { id: 'categorias', nombre: 'Categoría' },
    { id: 'subcategorias', nombre: 'Subcategoría', padre: 'categorias' },
    { id: 'tipoEntidad', nombre: 'Tipo de entidad' },
    { id: 'sector', nombre: 'Sector' },
  ],
  noticia: [
    { id: 'categorias', nombre: 'Categoría' },
    { id: 'subcategorias', nombre: 'Subcategoría', padre: 'categorias' },
    { id: 'entidadNombre', nombre: 'Entidad' },
    { id: 'sector', nombre: 'Sector' },
    { id: 'anioPublicacion', nombre: 'Año de publicación' },
    { id: 'mesPublicacion', nombre: 'Mes de publicación', padre: 'anioPublicacion' },
  ],
  participacion: [
    { id: 'categorias', nombre: 'Categoría' },
    { id: 'subcategorias', nombre: 'Subcategoría', padre: 'categorias' },
    { id: 'estado', nombre: 'Estado' },
    { id: 'fechaPublicacionFiltro', nombre: 'Fecha de publicación' },
    { id: 'fechaCierreFiltro', nombre: 'Fecha de cierre' },
  ],
  tramiteventanilla: [
    { id: 'entidadNombre', nombre: 'Entidad' },
  ],
  portaltransversal: [
    { id: 'entidadNombre', nombre: 'Entidad' },
  ]
}
