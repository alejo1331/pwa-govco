import { PanelPrimeraColumna } from "./panel-primera-columna"
import { PanelSegundaColumna } from "./panel-segunda-columna"
import { PanelTerceraColumna } from "./panel-tercera-columna"
import { PanelCuartaColumna } from "./panel-cuarta-columna"

export interface FooterInterface {
    data: {
        panelPrimeraColumna: PanelPrimeraColumna;
        panelSegundaColumna: PanelSegundaColumna;
        panelTerceraColumna: PanelTerceraColumna;
        panelCuartaColumna: PanelCuartaColumna;
    };
    succeeded: boolean;
    errors: string;
    message: string;
}
