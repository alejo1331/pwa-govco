
export interface NoticiaPublicadaModel {
  id: number;

  titulo: string;

  sumario: string;

  cuerpoTexto: string;

  fechaPublicacion: Date;

  fechaExpira: Date;

  urlImagen: string;

  entidad: string;

  estadoNoticiaId: number;
}
