import { ParametricasService } from '../services/parametricas-service/parametricas-service.service';
import { Injectable } from "@angular/core";

@Injectable()
export class GlobalConstants {

    tiempoEtiqueta: number;

    constructor(private parametricasServices: ParametricasService) {
        this.parametricasServices.getTiempoEtiquetaNuevo().subscribe((data) => {
            this.tiempoEtiqueta = data.tiempo;
        }, (error) => {
            console.error(error);
        })
    }
}