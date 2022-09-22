export interface BannerPrincipalModel {
  data: BannerPrincipalDetalle;
  succeeded: boolean;
  errors: string[] | null;
  message: string | null;
}

export interface BannerPrincipalDetalle {
  id: number;
  textoBienvenida: string;
  urlImagen: string | null;
  textoDescriptivo: string | null;
  textoBuscador: string;
  textoAuxiliar: string;
  textoBotonAuxiliar: string;
  urlBotonAuxiliar: string;
  listaImagenes: ListaImagenes[];
}

export interface ListaImagenes {
  id: number;
  idBanner: number;
  textoDescriptivo: string;
  urlImagen: string;
}
