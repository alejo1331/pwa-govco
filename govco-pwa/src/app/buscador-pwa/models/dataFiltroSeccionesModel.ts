export const DATA_FILTRO_SECCIONES = {
  tramite: [
    { id: 'categorias', nombre: 'Categoría', active: 0  },
    { id: 'subCategorias', nombre: 'Subcategoría', active: 0, padre: 'categorias' },
    { id: 'entidadNombre', nombre: 'Entidad', active: 0  },
    { id: 'sector', nombre: 'Sector', active: 0  },
    { id: 'nombreEstandarizado', nombre: 'Trámite estándar', active: 0  },
  ],
  entidad: [
    { id: 'categorias', nombre: 'Categoría', active: 0  },
    { id: 'subCategorias', nombre: 'Subcategoría', active: 0, padre: 'categorias' },
    { id: 'tipoEntidad', nombre: 'Tipo de entidad', active: 0  },
    { id: 'sector', nombre: 'Sector', active: 0  },
  ],
  noticia: [
    { id: 'categorias', nombre: 'Categoría', active: 0  },
    { id: 'subCategorias', nombre: 'Subcategoría', active: 0, padre: 'categorias' },
    { id: 'entidadNombre', nombre: 'Entidad', active: 0  },
    { id: 'sector', nombre: 'Sector', active: 0  },
    { id: 'anioPublicacionFiltro', nombre: 'Año de publicación', active: 0  },
    { id: 'mesPublicacionFiltro', nombre: 'Mes de publicación', active: 0, padre: 'anioPublicacionFiltro' },
  ],
  participacion: [
    { id: 'categorias', nombre: 'Categoría', active: 0  },
    { id: 'subCategorias', nombre: 'Subcategoría', active: 0, padre: 'categorias' },
    { id: 'estado', nombre: 'Estado', active: 0  },
    { id: 'fechaPublicacionFiltro', nombre: 'Fecha de publicación', active: 0  },
    { id: 'fechaCierreFiltro', nombre: 'Fecha de cierre', active: 0  },
  ],
  tramiteventanilla: [
    { id: 'entidadNombre', nombre: 'Entidad', active: 0  },
  ],
  portaltransversal: [
    { id: 'entidadNombre', nombre: 'Entidad', active: 0  },
  ]
}
