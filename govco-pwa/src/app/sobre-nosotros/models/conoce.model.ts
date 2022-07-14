export interface NosotrosResponse {
    data:      Data;
    succeeded: boolean;
    errors:    null;
    message:   null;
}

export interface Data {
    id:          number;
    codigo:      string;
    titulo:      string;
    descripcion: string;
}

export interface ConoceModel {
    govco: string,
    sirve: string,
    quien: string,
    imagen: string,
    altImagen: string
}