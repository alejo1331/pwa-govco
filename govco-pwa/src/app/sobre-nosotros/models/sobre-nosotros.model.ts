import { SobreNosotrosImagenModel } from "./sobre-nosotros-imagen.model";
import { SobreNosotrosLineaTemporalModel } from "./sobre-nosotros-linea-temporal.model";

export interface SobreNosotrosModel {
    imagen: SobreNosotrosImagenModel,
    lineaTemporalEstado:SobreNosotrosImagenModel,
    lineaTemporal:SobreNosotrosLineaTemporalModel
  }