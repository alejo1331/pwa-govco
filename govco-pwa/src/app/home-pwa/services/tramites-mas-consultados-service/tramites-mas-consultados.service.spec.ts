import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EstadoInterface } from '../../models/tramites-mas-consultados/estado-interface';
import { GeneralInterface } from '../../models/tramites-mas-consultados/general-interface';
import { PorMunicipioInterface } from '../../models/tramites-mas-consultados/por-municipio-interface';
import { TituloInterface } from '../../models/tramites-mas-consultados/titulo-interface';

import { TramitesMasConsultadosService } from './tramites-mas-consultados.service';

describe('TramitesMasConsultadosService', () => {
  let service: TramitesMasConsultadosService;
  let httpClientSpy: { get: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new TramitesMasConsultadosService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Se espera que el objeto del servicio sea igual al objeto simulado: Todos los tramites', (done: DoneFn) => {

    const mockEstadoTramites: GeneralInterface = {
      "data": [
        {
          "id": "16164",
          "nombre": "Certificado de Carencia de Informes por Tráfico de Estupefacientes",
          "iconoCategoria": ""
        },
        {
          "id": "1025",
          "nombre": "Registro sanitario o renovación de medicamentos importados incluidos en normas farmacológicas colombianas",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "144",
          "nombre": "Afiliación en forma colectiva al sistema de seguridad social integral a trabajadores independientes miembros de agremiaciones, asociaciones y comunidades religiosas",
          "iconoCategoria": ""
        },
        {
          "id": "152",
          "nombre": "Certificación de necesidades de recurso humano para presentar ante el Ministerio de Relaciones Exteriores",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "153",
          "nombre": "Licencia de prestación de servicios de protección radiológica y control de calidad",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "29360",
          "nombre": "Duplicado de recibos de pago",
          "iconoCategoria": ""
        },
        {
          "id": "307",
          "nombre": "Devolución y/o compensación por saldos a favor originados en las declaraciones o actos administrativos de Impuesto sobre las Ventas -IVA",
          "iconoCategoria": ""
        },
        {
          "id": "345",
          "nombre": "Convalidación de títulos de estudios de pregrado otorgados en el exterior",
          "iconoCategoria": "https://www.gov.co/uploads/3684b730-24b6-4cce-a608-7e4f583302a5.svg"
        },
        {
          "id": "366",
          "nombre": "Convalidación de títulos de estudios de posgrado obtenidos en el exterior",
          "iconoCategoria": "https://www.gov.co/uploads/3684b730-24b6-4cce-a608-7e4f583302a5.svg"
        },
        {
          "id": "83105",
          "nombre": "Consulta en línea del estado de vinculación a la estrategia UNIDOS.",
          "iconoCategoria": ""
        },
        {
          "id": "503",
          "nombre": "Visto bueno de importación en línea",
          "iconoCategoria": ""
        },
        {
          "id": "63286",
          "nombre": "Certificación de aportes en salud en los regímenes de excepción  y especial",
          "iconoCategoria": ""
        }
      ],
      "succeeded": true,
      "errors": null,
      "message": null,
      "totalRegistros": 0
    }

    httpClientSpy.get.and.returnValue(of(mockEstadoTramites));

    service.getTramitesMasConsultados().subscribe((resultado: GeneralInterface) => {
      expect(resultado).toEqual(mockEstadoTramites);
      done();
    });

  });

  it('Se espera que el objeto del servicio sea igual al objeto simulado: Estado tramites', (done: DoneFn) => {

    const mockEstadoTramites: EstadoInterface = {
      "data": {
        "id": 8,
        "tituloSeccion": "Trámites destacados",
        "itemsSeccion": "/TramitesYServicios/TramitesDestacados",
        "activo": 1,
        "tipo": 2,
        "seccion": 7,
        "permiteInactivar": true,
        "bannerInformativo": null
      },
      "succeeded": true,
      "errors": null,
      "message": null
    }

    httpClientSpy.get.and.returnValue(of(mockEstadoTramites));

    service.getTramitesMasConsultadosEstado().subscribe((resultado: EstadoInterface) => {
      expect(resultado).toEqual(mockEstadoTramites);
      done();
    });

  });

  it('Se espera que el objeto del servicio sea igual al objeto simulado: Datos titulo tramites', (done: DoneFn) => {

    const mockTituloTramites: TituloInterface = {
      "data": {
        "id": 1,
        "seccion": "LoMasConsultadoHome",
        "titulo": "Trámites más consultados"
      },
      "succeeded": true,
      "errors": null,
      "message": null,
      "totalRegistros": 0
    }

    httpClientSpy.get.and.returnValue(of(mockTituloTramites));

    service.getTramitesMasConsultadosTitulo('LoMasConsultadoHome').subscribe((resultado: TituloInterface) => {
      expect(resultado).toEqual(mockTituloTramites);
      done();
    });
  });

  it('Se espera que el objeto del servicio sea igual al objeto simulado: Tramites por municipio', (done: DoneFn) => {

    const mockTramitesPorMunicipio: PorMunicipioInterface = {
      "data": [
        {
          "id": "382",
          "nombre": "Postulación y asignación del subsidio familiar de vivienda de interés social para áreas urbanas",
          "iconoCategoria": "https://www.gov.co/uploads/ef7b32e1-efda-4330-b0e6-1e73e7bb339d.svg"
        },
        {
          "id": "152",
          "nombre": "Certificación de necesidades de recurso humano para presentar ante el Ministerio de Relaciones Exteriores",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "1025",
          "nombre": "Registro sanitario o renovación de medicamentos importados incluidos en normas farmacológicas colombianas",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "144",
          "nombre": "Afiliación en forma colectiva al sistema de seguridad social integral a trabajadores independientes miembros de agremiaciones, asociaciones y comunidades religiosas",
          "iconoCategoria": ""
        },
        {
          "id": "153",
          "nombre": "Licencia de prestación de servicios de protección radiológica y control de calidad",
          "iconoCategoria": "https://www.gov.co/uploads/9d4af2e2-dbf1-4113-a463-0decc05c1b4b.svg"
        },
        {
          "id": "29360",
          "nombre": "Duplicado de recibos de pago",
          "iconoCategoria": ""
        },
        {
          "id": "307",
          "nombre": "Devolución y/o compensación por saldos a favor originados en las declaraciones o actos administrativos de Impuesto sobre las Ventas -IVA",
          "iconoCategoria": ""
        },
        {
          "id": "345",
          "nombre": "Convalidación de títulos de estudios de pregrado otorgados en el exterior",
          "iconoCategoria": "https://www.gov.co/uploads/3684b730-24b6-4cce-a608-7e4f583302a5.svg"
        },
        {
          "id": "366",
          "nombre": "Convalidación de títulos de estudios de posgrado obtenidos en el exterior",
          "iconoCategoria": "https://www.gov.co/uploads/3684b730-24b6-4cce-a608-7e4f583302a5.svg"
        },
        {
          "id": "83105",
          "nombre": "Consulta en línea del estado de vinculación a la estrategia UNIDOS.",
          "iconoCategoria": ""
        },
        {
          "id": "503",
          "nombre": "Visto bueno de importación en línea",
          "iconoCategoria": ""
        },
        {
          "id": "63286",
          "nombre": "Certificación de aportes en salud en los regímenes de excepción  y especial",
          "iconoCategoria": ""
        }
      ],
      "succeeded": true,
      "errors": null,
      "message": null,
      "totalRegistros": 0
    }

    httpClientSpy.get.and.returnValue(of(mockTramitesPorMunicipio));

    service.getTramitesMasConsultadosPorMunicipio('27205').subscribe((resultado: PorMunicipioInterface) => {
      expect(resultado).toEqual(mockTramitesPorMunicipio);
      done();
    });
  });


});
