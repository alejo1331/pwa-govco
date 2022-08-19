export interface ServiciosResponse {
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
