export interface NoticiasDetalleModel {
    data:      Data;
    succeeded: boolean;
    errors:    null;
    message:   null;
}

export interface Data {
    noticia:       Noticia;
    otrasNoticias: Noticia[];
}

export interface Noticia {
    id:             number;
    titulo:         string;
    sumario:        string;
    cuerpo:         string;
    imagen:         string;
    fecha:          Date;
    idEstado:       number;
    idCategoria:    number | null;
    idSubCategoria: null;
    textoFecha:     string;
    codigoEntidad:  null | string;
    estado:         null;
}