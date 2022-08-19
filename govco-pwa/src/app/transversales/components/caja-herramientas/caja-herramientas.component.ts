import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-caja-herramientas',
  templateUrl: './caja-herramientas.component.html',
  styleUrls: ['./caja-herramientas.component.scss']
})
export class CajaHerramientasComponent implements OnInit {

  listPortal:any[] = [
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/059689e0-e99d-4abd-bca3-349aa9e5be07-GOV.CO1.jpg',
      url: 'https://xd.adobe.com/view/a03bc891-9002-415e-b2b1-f34200d55502-f568/?fullscreen',
      title: 'Proceso de integración a www.gov.co',
      description: 'Identifique aquí características, acciones y ruta a seguir en el proceso de integración al Portal Único del Estado Colombiano, www.gov.co'
    },
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/225af415-e9ee-4e2f-9ddf-784f1f3ea35c-GOV.CO2.jpg',
      url: 'https://xd.adobe.com/view/6cdd3ba8-38c2-4142-97fd-84b4ca24fe12-398e/?fullscreen',
      title: 'Puntos clave para el proceso de integración a www.gov.co',
      description: 'Reconozca los puntos más importantes que facilitan la integración de cada servicio teniendo en cuenta las normas y lineamientos ya establecidos para este propósito.'
    }
  ];

  listServicios:any[] = [
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/2e36cf79-4632-4c9a-a2d0-4cb672d06137-SCD1.jpg',
      url: 'https://xd.adobe.com/view/8075636c-3e86-494c-8863-1295c8ce78a5-d526/?fullscreen',
      title: '¿Qué son los Servicios Ciudadanos Digitales?',
      description: 'Encuentre las definiciones y características generales de cada uno de los servicios ciudadanos digitales.'
    },
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/081ccc4a-320a-4b59-8f72-b482396d1bac-SCD2.jpg',
      url: 'https://xd.adobe.com/view/a201c74f-bfbc-42ee-a5f6-e5e5348f3e5f-f752/?fullscreen',
      title: 'Carpeta Ciudadana Digital',
      description: 'Comprenda los lineamientos para la vinculación de los trámites de la entidad a través de este servicio.'
    },
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/4a5a70c7-f1d3-4eae-8335-ea092b77ccda-SCD3.jpg',
      url: 'https://xd.adobe.com/view/b1b41faa-4c73-426c-abbd-cdc55a77c072-e4e7/?fullscreen',
      title: 'Autenticación Digital',
      description: 'Identifique los conceptos, mecanismos y normatividad general que permite comprender la vinculación de este servicio.'
    },
    {
      img: 'https://govco-prod-webutils.s3.amazonaws.com/uploads/2021-07-16/ed40d43e-a4f0-4576-b36b-2733b06e56c8-SCD4.jpg',
      url: 'https://xd.adobe.com/view/965123d2-725b-4ee8-864a-a17b8598fa47-c302/?fullscreen',
      title: 'Interoperabilidad',
      description: 'Reconozca los elementos y plataforma para la vinculación a través de este servicio.'
    },
  ];

  dataVideo:any = {
    urlVideo: 'https://youtu.be/zDoCNDwZsxY',
    title: 'Conozca la Carpeta Ciudadana Digital y resuelva sus trámites y servicios ciudadanos',
    description: 'Encuentre los documentos resultados de sus interacciones con el Estado colombiano en un solo lugar.'
}

  constructor(
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true,'serviciosEntidades');
    this.bottomService.ajustandoPantalla(false);
  }

}
