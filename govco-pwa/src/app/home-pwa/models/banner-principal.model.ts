export interface BannerPrincipalModel {
    id: number,
    textoBienvenida : string,
    urlImagen :string,
    textoDescriptivo :string,
    textoBuscador  :string,
    textoAuxiliar:string,
    textoBotonAuxiliar: string,
    urlBotonAuxiliar: string,
    listaImagenes:[{textoDescriptivo:string,urlImagen:string}]

}
