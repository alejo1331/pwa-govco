import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { EjerciciosModel } from '../../models/ejercicios.model';
import { ParticipaModel } from '../../models/participa.model';
import { EjerciciosService } from '../../services/ejercicios.service';
import { ParticipaService } from '../../services/participa.service';
import { ValidarUrlService } from '../../services/validar-url.service';


@Component({
  selector: 'app-participa',
  templateUrl: './participa.component.html',
  styleUrls: ['./participa.component.scss']
})
export class ParticipaComponent implements OnInit {

  userProfile: object;
  userName: string;
  constructor() { }
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }
 
  page = 1;
  pageSize = 6;
  totalPage = 0;
  title: string;
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true,'participa');
  descripcion: string;

  ejercicios: EjerciciosModel[];
  videoHome: ParticipaModel;
  
  constructor(
    private EjerciciosService: EjerciciosService,
    private ParticipaService: ParticipaService,
    public validarUrlService: ValidarUrlService,
    ) { }

  ngOnInit() {

    // this.ParticipaService.getTitleAndDescription()
    // .subscribe((resp:any) => {
    //   this.title = resp.data.titulo;
    //   this.descripcion = resp.data.descripcion;
    // })
  }

  ngAfterViewInit() {
    window.addEventListener("load", () => {
      this.home();
      this.paginacion(this.page);
    });
  }
  
  paginacion(pagina: any) {
    this.EjerciciosService.getEjercicios(pagina, this.pageSize).subscribe((data) => {
      console.log(data);
      this.ejercicios = data.ejercicios;
      this.totalPage = data.totalPages * this.pageSize;
    }, (error) => {
      console.error(error);
    });
  }
  
  home() {
    this.ParticipaService.getHome().subscribe((data) => {
      this.videoHome = data;
    }, (error) => {
      console.error(error);
    });
  }
  
    //Función para seleccionar el estilo de acuerdo a las condiciones estipuladas en la HU
  getClassEstadoEjercicio(info: any) {
    let clase = "estado-ejercicio-participacion-activo";
    var aFecha1 = new Date(info.fechaFinalizacion).toLocaleDateString().split('/');
    var aFecha2 = new Date().toLocaleDateString().split('/');
    var fFecha1 = Date.UTC(Number(aFecha1[2]), Number(aFecha1[1]) - 1, Number(aFecha1[0]));
    var fFecha2 = Date.UTC(Number(aFecha2[2]), Number(aFecha2[1]) - 1, Number(aFecha2[0]));
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    if (dias == -1) {
      clase = 'estado-ejercicio-participacion-pausa';
      info.estado = "Falta un día";
    } else if (info.estado === 'Finalizado') {
      clase = 'estado-ejercicio-participacion-finalizado';
    }
    return clase;
  }
  
}

