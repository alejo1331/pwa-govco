export interface MomentosAudiencia {
    Descripcion: string;
    Excepcion: string[];
    Informacion: string[];
    MomentoId: string;
    Orden: number;
    active: boolean;
    acciones: AccionesMomentosAudiencia[];
}

export interface AccionesMomentosAudiencia {
    SOLICITUD: AccionSolicitud[];
    PAGO: AccionPago[];
    VERIFICACION_INST: AccionVerificacion[];
    FORMULARIO: AccionFormulario[];
    DOCUMENTO: AccionDocumento[];
    EXCEPCION: AccionExcepcion[];
}

export interface AccionSolicitud {
    AccionCondicionId: number;
    AtencionDescripcion: string;
    Excepcion: any;
    ExcepcionId: any;
    IdTramite: string;
    Orden: number;
    TipoAccionCondicion: string;
    data: DataAccionSolicitud[];
}

export interface DataAccionSolicitud {
    Correo: string;
    ExtensionTelFijo: string;
    HorarioAtencionTelef: string;
    NombreCanalWeb: string;
    NumeroTelefono: any;
    TipoCanal: string;
    TipoTelefono: string;
    UrlCanalWeb: string;
}

export interface AccionPago {
    AccionCondicionId: number;
    Excepcion: any;
    ExcepcionId: any;
    Orden: number;
    PagoDispEnInstitucion: string;
    PagoDispEntidadRecaudadora: string;
    PagoDispInstDescripcion: string;
    PagoDisponibleEnLinea: string;
    PagoEnlineaUrl: string;
    TipoAccionCondicion: string;
    data: DataAccionPago[];
    dataInicial: DataAccionPago[];
    entidadesPago: EntidadesPago[];
}

export interface DataAccionPago {
    CantidadSmlv: any,
    Descripcion: string;
    Moneda: string;
    Orden: number;
    TipoValor: string;
    Valor: number;
    active: boolean;
}

export interface EntidadesPago {
    CodigoRecaudo: any;
    NombreCuenta: string;
    NombreEntidad: string;
    NumeroCuenta: string;
    TipoCuenta: string;
}

export interface AccionFormulario {
    AccCondPtoAtencions: boolean;
    AccionCondicionId: number;
    Excepcion: any;
    ExcepcionId: any;
    Orden: number;
    TipoAccionCondicion: string;
    data: DataAccionFormulario[];
}

export interface DataAccionFormulario {
    FormularioAnotacion: string;
    FormularioNombre: string;
    FormularioUrl: any;
    FormularioUrlDescarga: string;
    UrlResultadoWeb: any;
    UrlTramiteEnLinea: string;
}

export interface AccionVerificacion {
    AccionCondicionId: number;
    Excepcion: any;
    ExcepcionId: any;
    Orden: number;
    TipoAccionCondicion: string;
    data: DataAccionVerificacion[];
}

export interface DataAccionVerificacion {
    VerificacionInstDescripcion: string;
}

export interface AccionDocumento {
    AccionCondicionId: number;
    Excepcion: any;
    ExcepcionId: any;
    Orden: number;
    TipoAccionCondicion: string;
    data: DataAccionDocumento[];
}

export interface DataAccionDocumento {
    Cantidad: number;
    DocumentoAnotacionAdicional: any;
    DocumentoNombre: string;
    Observacion: any;
    UnidadCantidad: string;
}

export interface AccionExcepcion {
    SOLICITUD?: any[];
    PAGO?: any[];
    VERIFICACION_INST?: any[];
    FORMULARIO?: any[];
    DOCUMENTO?: any[];
    Excepcion: string;
    active?: boolean;
}
