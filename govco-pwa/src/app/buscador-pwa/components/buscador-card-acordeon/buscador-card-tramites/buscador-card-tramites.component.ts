import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-card-tramites',
  templateUrl: './buscador-card-tramites.component.html',
  styleUrls: ['./buscador-card-tramites.component.scss'],
})
export class BuscadorCardTramitesComponent implements OnInit {
  data = [
    {
      id: '76254',
      titulo: 'Registro de hoja de vida en el SIGEP',
      descripcion:
        'Obtener el registro de la hoja de vida en el Sistema de Información y Gestión del Empleo Público (SIGEP), administrado por el Departamento Administrativo de la Función Pública, para la posesión en un empleo público o la firma de un contrato de prestación de servicios con una entidad del estado.\n\n',
      link: '/ficha-tramites-y-servicios/T76254',
      otro: 'DEPARTAMENTO ADMINISTRATIVO DE LA FUNCIÓN PÚBLICA',
      linkEntidad: 'https://www.funcionpublica.gov.co/',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '2 HORA(S) ',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
    {
      id: '33751',
      titulo:
        'Certificaciones y/o copias de los registros de las organizaciones sindicales ante el Ministerio del Trabajo',
      descripcion:
        'Obtener certificación o copia de la inscripción en el registro de organizaciones sindicales, estatutos, reformas estatutarias, inscripción de comités ejecutivos, juntas directivas, subdirectivas, comités seccionales, convenciones colectivas, pactos colectivos, laudos arbitrales, contratos sindicales o información y documentación relacionada con el archivo sindical de todo el territorio nacional, que reposa en el Ministerio del Trabajo.',
      link: '/ficha-tramites-y-servicios/T33751',
      otro: 'MINISTERIO DEL TRABAJO',
      linkEntidad: 'http://www.mintrabajo.gov.co/',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '2 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
    {
      id: '29929',
      titulo:
        'Inscripción en el registro sindical de creación de una subdirectiva o comité seccional',
      descripcion:
        'Registrar ante el Ministerio del Trabajo la conformación de subdirectivas o comités seccionales al interior de toda organización sindical, en el territorio nacional.',
      link: '/ficha-tramites-y-servicios/T29929',
      otro: 'MINISTERIO DEL TRABAJO',
      linkEntidad: 'http://www.mintrabajo.gov.co/',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '4 HORA(S) ',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
    {
      id: '31',
      titulo:
        'Registro del Acta de Constitución de una nueva Organización Sindical',
      descripcion:
        'Realizar la inscripción ante el Ministerio de Trabajo de una nueva organización sindical, con el fin de dar cumplimiento a lo establecido en el Código Sustantivo del Trabajo.',
      link: '/ficha-tramites-y-servicios/T31',
      otro: 'MINISTERIO DEL TRABAJO',
      linkEntidad: 'http://www.mintrabajo.gov.co/',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '4 HORA(S) ',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
    {
      id: '1135',
      titulo:
        'Gestión de novedades de nómina - modificar datos básicos y de identificación',
      descripcion:
        'Actualización y/o modificación de los datos básicos de contacto y  de identidad de un pensionado y/o beneficiario, respecto a cambios en sus datos de identificación: de registro civil a tarjeta de identidad o de tarjeta de identidad a cédula de ciudadanía.',
      link: '/ficha-tramites-y-servicios/T1135',
      otro: 'ADMINISTRADORA COLOMBIANA DE PENSIONES',
      linkEntidad: 'http://www.colpensiones.gov.co',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '15 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'PARCIAL',
    },
    {
      id: '76111',
      titulo: 'Gestión de novedades de nómina - mesada Adicional',
      descripcion:
        'Establecer mediante análisis la pertinencia de continuar devengando  la mesada adicional del  mes de junio (mesada 14), si a ello tiene lugar.',
      link: '/ficha-tramites-y-servicios/T76111',
      otro: 'ADMINISTRADORA COLOMBIANA DE PENSIONES',
      linkEntidad: 'http://www.colpensiones.gov.co',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '30 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'PARCIAL',
    },
    {
      id: '34942',
      titulo:
        'Cancelación de la personería jurídica de asociaciones de pensionados',
      descripcion:
        'Obtener la cancelación de la personería jurídica de asociaciones de pensionados por voluntad.',
      link: '/ficha-tramites-y-servicios/T34942',
      otro: 'MINISTERIO DEL TRABAJO',
      linkEntidad: 'http://www.mintrabajo.gov.co/',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '3 MES(ES) ',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
    {
      id: '132',
      titulo:
        'Retracto y anulación de afiliación a pensión en el Régimen de Prima Media',
      descripcion:
        'Retracto, el trabajador dependiente o independiente, desiste de la afiliación al Régimen de Prima Media con prestación definida administrado por Colpensiones, solicitando el retracto dentro de los cinco (5) días hábiles siguientes a la fecha en que recibe la respuesta de solicitud de afiliación o traslado. La anulación es aquella situación que se presenta cuando se detecta una irregularidad en el proceso de traslado o vinculación inicial que implica la cancelación de la misma. ',
      link: '/ficha-tramites-y-servicios/T132',
      otro: 'ADMINISTRADORA COLOMBIANA DE PENSIONES',
      linkEntidad: 'http://www.colpensiones.gov.co',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '15 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'PARCIAL',
    },
    {
      id: '76110',
      titulo: 'Gestión de  novedades de nómina – Embargos',
      descripcion:
        'Aplicar en la nómina de pensionados las novedades asociadas a órdenes judiciales de embargos emitidas dentro de procesos de alimentos y ejecutivos iniciados por cuotas de crédito o deudas a favor de cooperativas, que afectan el valor de la mesada pensional.  ',
      link: '/ficha-tramites-y-servicios/T76110',
      otro: 'ADMINISTRADORA COLOMBIANA DE PENSIONES',
      linkEntidad: 'http://www.colpensiones.gov.co',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '30 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'PARCIAL',
    },
    {
      id: '1027',
      titulo:
        'Novedad de retiro retroactivo de trabajadores del Régimen de Prima Media con Prestación Definida',
      descripcion:
        'Reportar por parte del empleador a la Administradora Colombiana de Pensiones – COLPENSIONES la novedad de retiro o novedad P (Requisitos cumplidos para pensión) de sus trabajadores que por omisión no fue informada en su momento a la Administradora de Pensiones. La solicitud de aplicación de novedad de retiro retroactivo también la puede realizar un afiliado dependiente anexando los documentos requeridos para tal fin.',
      link: '/ficha-tramites-y-servicios/T1027',
      otro: 'ADMINISTRADORA COLOMBIANA DE PENSIONES',
      linkEntidad: 'http://www.colpensiones.gov.co',
      categoriaNombre: '',
      fechaPublicacion: '',
      clasificacionOrganica: '',
      orden: '',
      estado: '',
      tipo: 'tramites',
      costo: 'NO',
      tiempoObtencion: '60 DIA(S) HÁBIL(ES)',
      obtencionInmediata: 'NO',
      enLinea: 'SI',
    },
  ];

  infoDescripcionTramite: any;
  contenidoDescripcion: string;
  contenidoLeido: string;
  caracteresCategoria: boolean = false;
  nombreExpanded: string = 'Leer más...';

  showBotonFechas: boolean;

  constructor() {}

  ngOnInit(): void {
    this.infoDescripcionTramite = this.data;
    this.contenidoDescripcion =
      this.infoDescripcionTramite.DescripcionTramite.substring(0, 125) + '...';
    this.contenidoLeido = this.infoDescripcionTramite.DescripcionTramite;
    if (this.contenidoDescripcion.length > 124) {
      this.caracteresCategoria = true;
    }
  }

  showExpended() {
    if (this.nombreExpanded === 'Leer más...') {
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = 'Leer menos';
    }
    return this.contenidoDescripcion;
  }

  showBotonLeer() {
    if (this.nombreExpanded === 'Leer más...') {
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite;
      this.nombreExpanded = 'Leer menos';
    } else {
      this.nombreExpanded = 'Leer más...';
      this.contenidoDescripcion =
        this.infoDescripcionTramite.DescripcionTramite.substring(0, 125) +
        '...';
    }
    return this.contenidoDescripcion;
  }

  activarItem(index: number) {
    let collection = document.querySelectorAll('.card-header.active');
    collection.forEach((element) => element.classList.toggle('active'));
    let cardActive = document.getElementById('heading' + index);
    cardActive?.classList.toggle('active');
  }
}
