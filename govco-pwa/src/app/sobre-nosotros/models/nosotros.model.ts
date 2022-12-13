export interface NosotrosModel {
    data:      Data;
    succeeded: boolean;
    errors:    null;
    message:   null;
}

export interface NosotrosModelV2 {
  data:      DataV2;
  succeeded: boolean;
  errors:    null;
  message:   null;
}

export interface Data {
    seccionUno:       SeccionCincoClass;
    seccionUnoImagen: SeccionTresClass;
    seccionDos:       SeccionCincoClass;
    seccionTres:      SeccionTresClass;
    seccionCuatro:    SeccionCuatroClass;
    seccionCinco:     SeccionCincoClass;
}

export interface DataV2 {
  seccionUno:       SeccionUnoClass;
  seccionDos:       SeccionDosClass;
  seccionTres:      SeccionTresV2Class;
  seccionCuatro:    SeccionCuatroV2Class;
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

export interface SeccionUnoClass {
  descripcionUno:     string;
  descripcionDos:     string;
  estado:             boolean;
  tituloUno:          string;
  tituloDos:          string;
  recursoAudiovisual: RecursoAudiovisualClass;
}

export interface RecursoAudiovisualClass {
  alt:  string;
  tipo: string;
  url:  string;
}

export interface SeccionDosClass {
  altIcono:   string;
  altImagen:  string;
  estado:     string;
  tarjetas?:   TarjetasClass[];
  titulo:     string;
  urlIcono:   string;
  urlImagen:  string;
}

export interface TarjetasClass {
  id:           number;
  descripcion:  string;
  titulo:       string;
}

export interface SeccionTresV2Class {
  altBoton: string;
  estado: boolean;
  textoBoton: string;
  titulo: string;
  urlBoton: string;
  fichasInformativas : FichasInformativas[];
}

export interface FichasInformativas {
  id: number;
  titulo: string;
  urlIcono: string;
  altIcono: string;
  descripcion: string;
}

export interface SeccionCuatroV2Class {
  estado: boolean;
  titulo: string;
}
