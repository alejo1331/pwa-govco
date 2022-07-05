import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConsultaUbicacionInterface } from '../../models/geolocalizacion/consulta-ubicacion-interface';
import { DepartamentoInterface } from '../../models/geolocalizacion/departamento-interface';
import { MunicipioInterface } from '../../models/geolocalizacion/municipio-interface';

import { GeolocalizacionService } from './geolocalizacion.service';

describe('GeolocalizacionService', () => {
  let service: GeolocalizacionService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GeolocalizacionService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe de visualizar todos los departamentos y su respectivo id', (done: DoneFn) => {
    const mockDepartamentos: DepartamentoInterface[] = [
      {
        "codigo": "05",
        "nombre": "Antioquia",
        "municipios": []
      },
      {
        "codigo": "08",
        "nombre": "Atlántico",
        "municipios": []
      },
      {
        "codigo": "11",
        "nombre": "Bogotá, D. C.",
        "municipios": []
      },
      {
        "codigo": "13",
        "nombre": "Bolívar",
        "municipios": []
      },
      {
        "codigo": "15",
        "nombre": "Boyacá",
        "municipios": []
      },
      {
        "codigo": "17",
        "nombre": "Caldas",
        "municipios": []
      },
      {
        "codigo": "18",
        "nombre": "Caquetá",
        "municipios": []
      },
      {
        "codigo": "19",
        "nombre": "Cauca",
        "municipios": []
      },
      {
        "codigo": "20",
        "nombre": "Cesar",
        "municipios": []
      },
      {
        "codigo": "23",
        "nombre": "Córdoba",
        "municipios": []
      },
      {
        "codigo": "25",
        "nombre": "Cundinamarca",
        "municipios": []
      },
      {
        "codigo": "27",
        "nombre": "Chocó",
        "municipios": []
      },
      {
        "codigo": "41",
        "nombre": "Huila",
        "municipios": []
      },
      {
        "codigo": "44",
        "nombre": "La Guajira",
        "municipios": []
      },
      {
        "codigo": "47",
        "nombre": "Magdalena",
        "municipios": []
      },
      {
        "codigo": "50",
        "nombre": "Meta",
        "municipios": []
      },
      {
        "codigo": "52",
        "nombre": "Nariño",
        "municipios": []
      },
      {
        "codigo": "54",
        "nombre": "Norte de Santander",
        "municipios": []
      },
      {
        "codigo": "63",
        "nombre": "Quindío",
        "municipios": []
      },
      {
        "codigo": "66",
        "nombre": "Risaralda",
        "municipios": []
      },
      {
        "codigo": "68",
        "nombre": "Santander",
        "municipios": []
      },
      {
        "codigo": "70",
        "nombre": "Sucre",
        "municipios": []
      },
      {
        "codigo": "73",
        "nombre": "Tolima",
        "municipios": []
      },
      {
        "codigo": "76",
        "nombre": "Valle del Cauca",
        "municipios": []
      },
      {
        "codigo": "81",
        "nombre": "Arauca",
        "municipios": []
      },
      {
        "codigo": "85",
        "nombre": "Casanare",
        "municipios": []
      },
      {
        "codigo": "86",
        "nombre": "Putumayo",
        "municipios": []
      },
      {
        "codigo": "88",
        "nombre": "Archipiélago de San Andrés, Providencia y Santa Catalina",
        "municipios": []
      },
      {
        "codigo": "91",
        "nombre": "Amazonas",
        "municipios": []
      },
      {
        "codigo": "94",
        "nombre": "Guainía",
        "municipios": []
      },
      {
        "codigo": "95",
        "nombre": "Guaviare",
        "municipios": []
      },
      {
        "codigo": "97",
        "nombre": "Vaupés",
        "municipios": []
      },
      {
        "codigo": "99",
        "nombre": "Vichada",
        "municipios": []
      }

    ];

    const mockMunicipiosMeta: MunicipioInterface[] = [
      {
        "codigo": "50001",
        "nombre": "Villavicencio",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50006",
        "nombre": "Acacías",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50110",
        "nombre": "Barranca de Upía",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50124",
        "nombre": "Cabuyaro",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50150",
        "nombre": "Castilla La Nueva",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50223",
        "nombre": "Cubarral",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50226",
        "nombre": "Cumaral",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50245",
        "nombre": "El Calvario",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50251",
        "nombre": "El Castillo",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50270",
        "nombre": "El Dorado",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50287",
        "nombre": "Fuente de Oro",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50313",
        "nombre": "Granada",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50318",
        "nombre": "Guamal",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50325",
        "nombre": "Mapiripán",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50330",
        "nombre": "Mesetas",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50350",
        "nombre": "La Macarena",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50370",
        "nombre": "Uribe",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50400",
        "nombre": "Lejanías",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50450",
        "nombre": "Puerto Concordia",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50568",
        "nombre": "Puerto Gaitán",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50573",
        "nombre": "Puerto López",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50577",
        "nombre": "Puerto Lleras",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50590",
        "nombre": "Puerto Rico",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50606",
        "nombre": "Restrepo",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50680",
        "nombre": "San Carlos de Guaroa",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50683",
        "nombre": "San Juan de Arama",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50686",
        "nombre": "San Juanito",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50689",
        "nombre": "San Martín",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50711",
        "nombre": "Vistahermosa",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      }
    ]

    httpClientSpy.get.and.returnValue(of(mockDepartamentos));

    service.getDepartamentos().subscribe((resultado: DepartamentoInterface[]) => {
      console.log("Departamentos", resultado)
      expect(resultado).toEqual(mockDepartamentos);
      done();
    })
  });

  it('Debe de visualizar todos los municios del departamento Meta', (done: DoneFn) => {
    const mockMunicipiosMeta: MunicipioInterface[] = [
      {
        "codigo": "50001",
        "nombre": "Villavicencio",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50006",
        "nombre": "Acacías",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50110",
        "nombre": "Barranca de Upía",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50124",
        "nombre": "Cabuyaro",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50150",
        "nombre": "Castilla La Nueva",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50223",
        "nombre": "Cubarral",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50226",
        "nombre": "Cumaral",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50245",
        "nombre": "El Calvario",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50251",
        "nombre": "El Castillo",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50270",
        "nombre": "El Dorado",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50287",
        "nombre": "Fuente de Oro",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50313",
        "nombre": "Granada",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50318",
        "nombre": "Guamal",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50325",
        "nombre": "Mapiripán",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50330",
        "nombre": "Mesetas",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50350",
        "nombre": "La Macarena",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50370",
        "nombre": "Uribe",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50400",
        "nombre": "Lejanías",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50450",
        "nombre": "Puerto Concordia",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50568",
        "nombre": "Puerto Gaitán",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50573",
        "nombre": "Puerto López",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50577",
        "nombre": "Puerto Lleras",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50590",
        "nombre": "Puerto Rico",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50606",
        "nombre": "Restrepo",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50680",
        "nombre": "San Carlos de Guaroa",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50683",
        "nombre": "San Juan de Arama",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50686",
        "nombre": "San Juanito",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50689",
        "nombre": "San Martín",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      },
      {
        "codigo": "50711",
        "nombre": "Vistahermosa",
        "codigoDepartamento": "50",
        "departamento": {
          "codigo": "50",
          "nombre": "Meta"
        }
      }
    ]

    httpClientSpy.get.and.returnValue(of(mockMunicipiosMeta));

    service.getMunicipiosPorDepartamento('50').subscribe((resultado: MunicipioInterface[]) => {
      console.log("Municipios del Meta", resultado)
      expect(resultado).toEqual(mockMunicipiosMeta);
      done();
    })
  });

  it('Debe de visualizar tanto el depatamento y sus municipios acorde a la ubicacion por geolocalizacion', (done: DoneFn) => {
    const mockUbicacion: ConsultaUbicacionInterface = {
      "codigoDepartamento": "50",
      "codigoMunicipio": "50226",
      "municipios": [
        {
          "codigo": "50001",
          "nombre": "Villavicencio",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50006",
          "nombre": "Acacías",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50110",
          "nombre": "Barranca de Upía",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50124",
          "nombre": "Cabuyaro",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50150",
          "nombre": "Castilla La Nueva",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50223",
          "nombre": "Cubarral",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50226",
          "nombre": "Cumaral",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50245",
          "nombre": "El Calvario",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50251",
          "nombre": "El Castillo",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50270",
          "nombre": "El Dorado",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50287",
          "nombre": "Fuente de Oro",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50313",
          "nombre": "Granada",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50318",
          "nombre": "Guamal",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50325",
          "nombre": "Mapiripán",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50330",
          "nombre": "Mesetas",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50350",
          "nombre": "La Macarena",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50370",
          "nombre": "Uribe",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50400",
          "nombre": "Lejanías",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50450",
          "nombre": "Puerto Concordia",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50568",
          "nombre": "Puerto Gaitán",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50573",
          "nombre": "Puerto López",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50577",
          "nombre": "Puerto Lleras",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50590",
          "nombre": "Puerto Rico",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50606",
          "nombre": "Restrepo",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50680",
          "nombre": "San Carlos de Guaroa",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50683",
          "nombre": "San Juan de Arama",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50686",
          "nombre": "San Juanito",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50689",
          "nombre": "San Martín",
          "codigoDepartamento": "50",
          "departamento": null
        },
        {
          "codigo": "50711",
          "nombre": "Vistahermosa",
          "codigoDepartamento": "50",
          "departamento": null
        }
      ]
    }

    httpClientSpy.get.and.returnValue(of(mockUbicacion));

    service.getUbicacion('4.2660458','-73.4770493').subscribe((resultado: ConsultaUbicacionInterface) => {
      console.log("Municipios del Meta", resultado)
      expect(resultado).toEqual(mockUbicacion);
      done();
    })
  });

});
