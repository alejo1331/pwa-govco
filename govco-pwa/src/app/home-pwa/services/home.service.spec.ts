import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeService } from './home.service';
import { ObtenerBannerNoticiaRespuesta } from '../models/NoticiasModel';
import { of } from 'rxjs';
import { ObtenerTemasInteresRespuesta } from '../models/TemasInteresModel';

describe('HomeService', () => {
  let service: HomeService;
  let httpClientSpy: { get: jasmine.Spy };

  const mockInformacionNoticias: ObtenerBannerNoticiaRespuesta = {
    data: {
      banner: {
          id: 1,
          codigo: 'general',
          titulo: 'Actualidad',
          descripcion: 'Entérate de las noticias del Estado colombiano.',
          mensaje: ''
      },
      noticias: [
        {
          id: 270,
          titulo: 'Colombia se une por la misión',
          sumario: 'Este es el sumario de la noticia',
          cuerpo: '<p>Este es el cuerpo de la noticia colombia se une por la misión</p>',
          imagen: 'https://govco-preprod-webutils.s3.amazonaws.com/uploads/2022-07-26/d0f0eb89-4569-4a85-a8aa-78a0246c8156-articles-237941_foto_marquesina.jpg',
          fecha: '2022-07-26T00:00:00',
          idEstado: 2,
          idCategoria: 23,
          idSubCategoria: 0,
          textoFecha: '26 de julio de 2022',
          codigoEntidad: '8007',
          estado: ''
        },
        {
          id: 269,
          titulo: 'Madres gestantes o lactantes prueba Tan',
          sumario: 'En la Alcaldía de Bogotá encuentras un apoyo incondicional para tu situación de madre gestante o lactante.',
          cuerpo: '<p>En la Alcaldía de Bogotá encuentras un apoyo incondicional para tu situación de madre gestante o lactante. Tenemos muchos programas para hacer más tranquilo tu proceso.&nbsp;</p><p><span style=\font-family: &quot;Work Sans&quot;, sans-serif;\>La Secretaría de Salud creó una estrategia para que las madres que tienen bebés internados en el Hospital de Kennedy puedan visitarlos evitando desplazamientos dentro de la unidad y así evitar posibles contagios de coronavirus.\r\n \r\n “Cerca de ti”, es la estrategia donde las madres realizan una videollamada, la cual se hace desde una tableta en una cabina adaptada por la Subred, con el objetivo de que puedan ver a su bebé y así seguir manteniendo el vínculo afectivo.</span></p><p><br></p><p><span style=\font-family: &quot;Work Sans&quot;, sans-serif;\>Para que estos encuentros sean posibles se conformó un equipo interdisciplinario entre trabajadores sociales, psicólogos y colaboradores de la oficina de Participación Comunitaria y Servicio al Ciudadano, prestos a efectuar las videollamadas, llenando de alegría a estas familias\', explicó Mirella Peña, jefe de la oficina de Participación Comunitaria y Servicio al Ciudadano.   Además, señaló que desde el 14 de mayo, cuando inició la estrategia en la Subred Sur Occidente se han realizado 260 video llamadas, en promedio 25 diarias, beneficiando a 143 familias que tiene sus hijos en las Unidades de Cuidados Intensivos.   Por su parte las madres que se han beneficiado del programa agradecieron la labor que ha realizado el personal de salud del Hospital de Kennedy.   “Me encanta la iniciativa porque pude ver a mi bebé virtualmente, ya que no se puede entrar porque debemos cuidarlo del coronavirus. Estoy muy agradecida porque sería muy triste no poder ver a mi hija, aunque no la puedo tocar el hecho de verla por medio de un video me hace muy feliz\', afirmó Deisy Silva quien no puede visitar a su hija debido a las restricciones de las visitas presenciales para evitar contagios.<br></span><br></p>',
          imagen: 'https://govco-preprod-webutils.s3.amazonaws.com/uploads/2022-07-23/3da61f49-21b8-4631-b4b3-0a04ca10b40f-noticia 2.jpg',
          fecha: '2022-07-22T00:00:00',
          idEstado: 2,
          idCategoria: 18,
          idSubCategoria: 66,
          textoFecha: '22 de julio de 2022',
          codigoEntidad: '1400',
          estado: ''
        },
        {
          id: 268,
          titulo: 'El mensaje de Estados Unidos a Gustavo Petro, tras su triunfo en las urnas 14',
          sumario: 'El secretario de Estado de EE. UU., Antony Blinken, le envió un contundente mensaje al presidente electo de los colombianos y también al país.',
          cuerpo: '<p>Luego de que el presidente electo, Gustavo Petro, le enviara un mensaje al gobierno de Estados Unidos en su discurso de celebración desde el Movistar Arena, el secretario de Estado de la administración de Joe Biden, le respondió en su cuenta de Twitter. Petro sostuvo que “toca actuar”, en referencia a la urgencia de proteger los recursos naturales, en especial, la selva amazónica. Hizo un llamado a toda la región para que la protección sea global, e incluyó un llamado puntual al gobierno de Estados Unidos, país al que invitó a “sentarse a dialogar” sobre la importancia del cambio climático, protección de ecosistemas y el cambio de las energías fósiles por unas renovables. Le puede interesar: Con Gustavo Petro, la izquierda se consolida en América Latina Minutos después era Blinken el que le enviaba un mensaje. En su cuenta de Twitter el secretario de Estado felicitó al pueblo colombiano !por ejercer su derecho al voto y reafirmar la fortaleza de su democracia”.</p>',
          imagen: 'https://govco-preprod-webutils.s3.amazonaws.com/uploads/2022-07-23/2432caa2-6ad4-45ef-8d23-061ef58c6203-EP11.jpg',
          fecha: '2022-07-21T00:00:00',
          idEstado: 2,
          idCategoria: 19,
          idSubCategoria: 60,
          textoFecha: '21 de julio de 2022',
          codigoEntidad: '0018',
          estado: ''
        }
      ]
    },
    succeeded: true,
    errors: null,
    message: ''
  }

  const mockInformacionTemasInteres: ObtenerTemasInteresRespuesta = {
    data: {
      estadoSeccion: 1,
      panelInferior: {
        id: 5,
        estado: 1,
        urlLogo: 'https://www.gov.co/uploads/f09ce111-dda0-4aba-a4ea-b8c2c6279274.webp', 
        titulo: 'Portales de Programas Transversales', 
        descripcion: 'Encuentra en un solo lugar acceso a la información de programas de impacto nacional para tu beneficio.', 
        seccion: 2,
        tipoPanel: 6,
        idMapaSitio: 7,
        mapaDeSitio: {
          id: 7,
          tituloSeccion: 'Temas de interés', 
          itemsSeccion: '/Home/TemasDeInteres', 
          activo: 1,
          tipo: 1,
          seccion: 4,
          permiteInactivar: true,
          bannerInformativo: ''
        }
      },
      panelSuperior: {
        id: 4,
        estado: 1,
        urlLogo: 'https://www.gov.co/uploads/4f0041eb-f559-4575-ba29-d859fe61674f.webp', 
        titulo: 'También te puede interesar', 
        descripcion: '',
        seccion: 2,
        tipoPanel: 5,
        idMapaSitio: 7,
        mapaDeSitio: {
          id: 7,
          tituloSeccion: 'Temas de interés', 
          itemsSeccion: '/Home/TemasDeInteres', 
          activo: 1,
          tipo: 1,
          seccion: 4,
          permiteInactivar: true,
          bannerInformativo: ''
        }
      },
      contenidoPanelInferior: [
        {
          id: 1,
          titulo: 'Conoce más sobre el turismo en nuestro país', 
          descripcion: 'Colombia es hermosa y queremos que conozcas más sobre ella.', 
          urlDestino: 'https://www.colombia.co/', 
          urlImagen: 'https://govco-poc.s3.us-east-2.amazonaws.com/uploads/2021-05-14/73a088fc-0f0e-4f63-8a22-7f0ec42e1d36-temasdeinteres_turismo.jpg', 
          fechaModificacion: '2021-05-14T23:54:28.334421', 
          ordenPresentacion: 1,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        },
        {
          id: 4,
          titulo: 'Ventanillas Únicas Digitales', 
          descripcion: 'Encuentra en un solo lugar ventanillas únicas que te permiten realizar múltiples trámites desde un solo sitio.', 
          urlDestino: 'https://beta.www.gov.co/ventanillas-unicas', 
          urlImagen: 'https://govco-poc.s3.us-east-2.amazonaws.com/uploads/2021-05-14/3913de74-4469-4bca-83be-279483bf03ff-Temasdeinteres_Ventanillas.jpg', 
          fechaModificacion: '2021-05-14T23:56:00.286332', 
          ordenPresentacion: 2,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        },
        {
          id: 5,
          titulo: 'Portales de Programas Transversales', 
          descripcion: 'Encuentra en un solo lugar acceso a la información de programas de impacto nacional para tu beneficio.', 
          urlDestino: 'https://beta.www.gov.co/portales', 
          urlImagen: 'https://govco-poc.s3.us-east-2.amazonaws.com/uploads/2021-05-14/e7c46603-9c48-47f0-876b-ae684398738c-Temasdeinteres_Portales.jpg', 
          fechaModificacion: '2021-05-14T23:56:46.794063', 
          ordenPresentacion: 3,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        },
        {
          id: 2,
          titulo: '¿Sabes qué son los datos abiertos y cómo usarlos?', 
          descripcion: 'La información que producen las entidades públicas de su trabajo, todo a tu alcance.', 
          urlDestino: 'https://www.datos.gov.co/', 
          urlImagen: 'https://govco-poc.s3.us-east-2.amazonaws.com/uploads/2021-05-14/f594b3a5-de20-4831-8f9f-f0a6fb7f2a44-temasdeinteres_datos.jpg', 
          fechaModificacion: '2021-05-14T23:53:50.260781', 
          ordenPresentacion: 4,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        },
        {
          id: 3,
          titulo: '#YoMeQuedoEnCasa', 
          descripcion: 'Las entidades territoriales te atienden sin salir de casa.', 
          urlDestino: 'https://beta.www.gov.co/territorial/pqrds/creacion', 
          urlImagen: 'https://govco-poc.s3.us-east-2.amazonaws.com/uploads/2021-05-14/bd8f9cd8-8caa-4584-af5e-a0523c0dc580-Temasdeinteres_territorial.jpg', 
          fechaModificacion: '2021-05-14T23:55:05.927868', 
          ordenPresentacion: 5,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        },
        {
          id: 6,
          titulo: 'Prueba historial.', 
          descripcion: 'Prueba historial', 
          urlDestino: 'https://coronaviruscolombia.gov.co', 
          urlImagen: 'https://govco-preprod-webutils.s3.amazonaws.com/uploads/2021-07-17/3a0aa3e3-4082-43d1-baa7-313ed0298654-Temasdeinteres_territorial.jpg', 
          fechaModificacion: '2021-07-17T22:39:19.076372', 
          ordenPresentacion: 6,
          usuario: 'user', 
          estado: true,
          idTemasDeInteres: 5
        }
      ]
    },
    succeeded: true,
    errors: null,
    message: ''
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new HomeService(httpClientSpy as any);
  });

  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  // Actualidad
  it('#obtenerNoticias debe retornar la propiedad succeeded como true', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionNoticias));

    service.obtenerNoticias().subscribe(
      (data: ObtenerBannerNoticiaRespuesta) => {
        expect(data.succeeded).toBeTrue();
      });
  });

  it('#obtenerNoticias debe retornar la propiedad succeeded como true cuando error este vacio', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionNoticias));

    service.obtenerNoticias().subscribe(
      (data: ObtenerBannerNoticiaRespuesta) => {
        expect(data.errors).toBeFalsy();
        expect(data.succeeded).toBeTrue();
      });
  });

  it('#obtenerNoticias debe retornar al menos una noticia', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionNoticias));

    service.obtenerNoticias().subscribe(
      ({ data }: ObtenerBannerNoticiaRespuesta) => {
        expect(data.noticias.length).toBeGreaterThan(0);
      });
  });

  it('#obtenerNoticias debe retornar la propiedad id de las noticias de tipo numerico', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionNoticias));

    service.obtenerNoticias().subscribe(
      ({ data }: ObtenerBannerNoticiaRespuesta) => {
        expect(data.noticias[0].id).not.toBeNaN();
      });
  });


  //Temas de interes
  it('#obtenerTemasInteres debe retornar la propiedad succeeded como true', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionTemasInteres));

    service.obtenerTemasInteres().subscribe(
      (data: ObtenerTemasInteresRespuesta) => {
        expect(data.succeeded).toBeTrue();
      });
  });

  it('#obtenerTemasInteres debe retornar la propiedad succeeded como true cuando error este vacio', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionTemasInteres));

    service.obtenerTemasInteres().subscribe(
      (data: ObtenerTemasInteresRespuesta) => {
        expect(data.errors).toBeFalsy();
        expect(data.succeeded).toBeTrue();
      });
  });

  it('#obtenerTemasInteres debe retornar al menos una tema de interes', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionTemasInteres));

    service.obtenerTemasInteres().subscribe(
      ({ data }: ObtenerTemasInteresRespuesta) => {
        expect(data.contenidoPanelInferior.length).toBeGreaterThan(0);
      });
  });

  it('#obtenerTemasInteres debe retornar la propiedad id de los temas de interes de tipo numerico', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockInformacionTemasInteres));

    service.obtenerTemasInteres().subscribe(
      ({ data }: ObtenerTemasInteresRespuesta) => {
        expect(data.contenidoPanelInferior[0].id).not.toBeNaN();
      });
  });
});
