import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { FooterServiceService } from './footer-service.service';
import { FooterInterface } from '../../models/footer-models/footer-interface';
import { of } from 'rxjs';

describe('FooterServiceService', () => {
  let serviceFooter: FooterServiceService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    serviceFooter = new FooterServiceService(httpClientSpy as any)
  });

  it('Debe de crearse correctamente', () => {
    expect(serviceFooter).toBeTruthy();
  });

  it('Debe de visualizar el objeto del servicio', (done: DoneFn) => {

    const mockInformacionFooter: FooterInterface = {
      "data": {
        "panelPrimeraColumna": {
          "govcoUrlImagen": "https://www.gov.co/uploads/53cb9900-1f6d-4d95-81a1-02e02efbe3be.svg",
          "govcoUrlDestino": "https://www.gov.co/",
          "govcoTextoAlternativo": "Logo Gobierno de Colombia",
          "marcacoUrlDestino": "https://www.colombia.co/",
          "marcacoUrlImagen": "https://www.gov.co/uploads/23c08fdb-7970-420c-a556-c3af1802ef58.svg",
          "marcacoTextoAlternativo": "Logo Marca Pa\u00EDs Colombia"
        },
        "panelSegundaColumna": {
          "titulo": "Portal \u00DAnico del Estado Colombiano",
          "textoDireccion": "Direcci\u00F3n: ",
          "direccion": "Edificio Murillo Toro Cra 8 entre calles 12A y 12B Bogot\u00E1, Colombia.",
          "tituloHorario": "Horarios de Atenci\u00F3n:",
          "horarioPresencial": "Atenci\u00F3n Presencial: Martes, Mi\u00E9rcoles y Viernes de 9:00 am a 3:00 pm jornada continua.",
          "horarioVirtual": "Atenci\u00F3n Canales Virtuales: Lunes a Viernes de 8:30 am a 4:30 pm.",
          "textoCodigoPostal": "C\u00F3digo Postal: ",
          "codigoPostal": "111711"
        },
        "panelTerceraColumna": {
          "titulo": "Contacto",
          "tituloUrlImagen": "https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-08-19/ce500577-f217-4e7a-95cc-bc5412c26264-phone.svg",
          "tituloTelefono": "T\u00E9lefono:",
          "telefonoNacional": "Nacional: 01 8000 95 2525",
          "telefonoLocal": "Bogot\u00E1: \u002B(57) 601 390 7950",
          "centroRelevoUrlDestino": "https://www.centroderelevo.gov.co/632/w3-channel.html",
          "centroRelevoTexto": "Centro de relevo",
          "lineaAnticorrupcion": "L\u00EDnea Anticorrupci\u00F3n: 01 8000 91 2667",
          "correoTexto": "Correo Institucional: ",
          "correoInstitucional": "soporteccc@mintic.gov.co",
          "correoUrlDestino": "mailto:soporteccc@mintic.gov.co",
          "soLlamadaTexto": "Solicita una llamada",
          "soLlamadaUrlDestino": "https://procesosocm.outsourcing.com.co:8118/",
          "llamadaWebTexto": "Llamada web",
          "llamadaWebUrlDestino": "https://procesosocm.outsourcing.com.co:8115/",
          "hablemosTexto": "Hablemos en l\u00EDnea",
          "hablemosUrlDestino": "https://frontos.outsourcing.com.co:8201/index1.php"
        },
        "panelCuartaColumna": {
          "titulo": "Acerca del sitio",
          "tituloUrlImagen": "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-04-22/0dbe58e1-4c2e-4419-8252-4309c7ccdd64-info-circle.svg",
          "centroRelevoUrlDestino": "https://www.centroderelevo.gov.co/632/w3-channel.html",
          "centroRelevoTexto": "Centro de relevo",
          "ayudaAccesibilidad": "Ayudas de accesibilidad",
          "ayudaAccesibilidadImagen": "https://govco-prod-webutils.s3.amazonaws.com/uploads/2022-04-22/b2d89fa5-0a46-4d28-ad11-b2cf6ed410c2-child.svg",
          "mapaSitioTexto": "Mapa del sitio",
          "mapaSitioUrlDestino": "https://qa-govco-and.xyz/mapa-del-sitio",
          "poPrivacidadTexto": "Pol\u00EDticas de privacidad",
          "poPrivacidadUrlDestino": "https://www.gov.co/terminos-y-condiciones?seccion=avisoPrivacidad",
          "poAutorTexto": "Pol\u00EDticas de derechos de autor",
          "poAutorUrlDestino": "https://www.gov.co/terminos-y-condiciones?seccion=derechosPropiedadIntelectual",
          "terCondicionesTexto": "T\u00E9rminos y condiciones",
          "terCondicionesUrlDestino": "https://www.gov.co/terminos-y-condiciones",
          "twitterNombre": "S\u00EDguenos en Twitter",
          "twitterUrlImagen": "https://aws.www.gov.co/uploads/db6f60d8-de5e-4610-a832-9b943e5fbf23.svg",
          "twitterUrlDestino": "https://twitter.com/GobDigitalCO",
          "facebookNombre": "S\u00EDguenos en Facebook",
          "facebookUrlImagen": "https://www.gov.co/uploads/2253a0f8-5d3e-4059-94d2-dd453ba58fe4.svg",
          "facebookUrlDestino": "https://www.facebook.com/GobDigitalCO/"
        }
      },
      "succeeded": true,
      "errors": null,
      "message": null
    };

    httpClientSpy.get.and.returnValue(of(mockInformacionFooter));

    serviceFooter.getInformacionFooter().subscribe((resultado:FooterInterface)=>{
      expect(resultado).toEqual(mockInformacionFooter);
      done();
    });

  });

});
