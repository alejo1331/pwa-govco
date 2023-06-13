export interface DataLoMasConsultado {
  data: DataResultado;
  succeeded: boolean;
  errors: string | null;
  message: string | null;
  totalRegistros: number;
}

export interface DataResultado {
  id : string;
  nombreEstandarizado : string;
  nombre : string;
  palabrasClaves : string;
  proposito : string;
  institucionNombre : string;
  sigla : string;
  municipioNombre : string;
  departamentoNombre : string;
  categoriaNombre : string;
  situacionVidaNombre : string;
  sectNombre : string;
  estadoCodigo : string;
  urlTramiteGOVCO : string;
  urlEntidad : string;
  urlTramiteGOVCOFull : string;
  urlTramiteEnLineaSUIT3 : string | null;
  seccionTramiteServicios : number;
  realizadoMediosElectronicos : string;
  tiempoObtencion : string;
  costo: number;
  obtencionInmediata:string;
  sectId:string;
  destacado : number;
  orden : number;
  intitucionId : string;
  fechaActualizacion : string;
  idDepartamento : string | null;
  idMunicipio: string | null;
  linea: string | null;
}
