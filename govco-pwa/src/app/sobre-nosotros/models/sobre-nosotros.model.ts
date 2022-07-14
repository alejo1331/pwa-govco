import { SobreNosotrosImagenModel } from "./sobre-nosotros-imagen.model";
import { sobreNosotrosLineaTemporalModel } from "./sobre-nosotros-linea-temporal.model";

export interface SobreNosotrosModel {
    imagen: SobreNosotrosImagenModel,
    lineaTemporalEstado:SobreNosotrosImagenModel,
    lineaTemporal:sobreNosotrosLineaTemporalModel
  }