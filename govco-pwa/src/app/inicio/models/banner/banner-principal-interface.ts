export interface BannerPrincipalInterface {
    id: number,
    textoBienvenida : string,
    urlImagen :string,
    textoDescriptivo :string,
    textoBuscador  :string,
    textoAuxiliar:string,
    estadoBotonAuxiliar:string,
    textoBotonAuxiliar:string,
    urlBotonAuxiliar:string,
    urlExterna:number,
    listaImagenes:[{textoDescriptivo:string,urlImagen:string}]
}
