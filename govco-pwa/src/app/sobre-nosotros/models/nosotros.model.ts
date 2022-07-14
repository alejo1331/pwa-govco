export interface NosotrosModel {
    data:      Data;
    succeeded: boolean;
    errors:    null;
    message:   null;
}

export interface Data {
    seccionUno:       SeccionCuatroClass;
    seccionUnoImagen: SeccionTresClass;
    seccionDos:       SeccionCincoClass;
    seccionTres:      SeccionTresClass;
    seccionCuatro:    SeccionCuatroClass;
    seccionCinco:     SeccionCincoClass;
}

export interface SeccionCuatroClass {
    estado:      boolean;
    titulo:      string;
    descripcion: string;
    items?:      SeccionCuatroItem[];
}

export interface SeccionCuatroItem {
    orden:       number;
    titulo:      string;
    descripcion: string;
    url:         string;
    urlTexto:    string;
    estado:      boolean;
}

export interface SeccionTresClass {
    estado:    boolean;
    titulo?:   string;
    altImagen: string;
    urlImagen: string;
}

export interface SeccionCincoClass {
    estado:      boolean;
    titulo:      string;
    descripcion: string;
    items?:      SeccionCincoItem[];
}

export interface SeccionCincoItem {
    orden:       number;
    titulo:      string;
    descripcion: string;
    urlImagen:   string;
    altImagen:   string;
    estado:      boolean;
}