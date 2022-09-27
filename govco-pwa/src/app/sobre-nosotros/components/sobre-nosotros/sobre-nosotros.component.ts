import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';
import { ConoceModel, } from '../../models/conoce.model';
import { NosotrosModel } from '../../models/nosotros.model';
import { SobreNosotrosModel } from '../../models/sobre-nosotros.model';
import { SobreNosotrosService } from '../../services/sobre-nosotros.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.scss']
})
export class SobreNosotrosComponent implements OnInit {

  codigo: string = environment.codSobreNosotros;
  dataNosotros: NosotrosModel;
  description: string;
  infoConoce: ConoceModel;
  loadData: boolean;
  sobreNosotros: SobreNosotrosModel;
  title: string;


  constructor(
    private sobreNosotrosService: SobreNosotrosService,
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true,true);
    this.bottomService.putOcultandoBottomMenu(false);
    this.bottomService.seleccionandoItem(0);
    this.servicioSideNav.seleccionandoItem(true,'sobreNosotros');
    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;

    this.sobreNosotrosService.getTitleAndDescription(this.codigo)
      .subscribe((resp) => {
        this.title = resp.data.titulo;
        this.description = resp.data.descripcion;
      });

    this.sobreNosotrosService.getInfoConoce()
      .subscribe((data: ConoceModel) => {
        this.infoConoce = data;
      },
        (error) => {
          console.error(error);
        }
      );

    this.sobreNosotrosService.ObtenerSeccion()
      .subscribe((data: SobreNosotrosModel) => {
        this.sobreNosotros = data;
      },
        (error) => {
          console.error(error);
        }
      );


    this.consultarDataNosotros();
  }

  //Suscribe extrae la data de la pagina sobre nosotros
  consultarDataNosotros() {
    this.sobreNosotrosService.getInfoPaginaSobreNosotros()
      .subscribe((data: NosotrosModel) => {
        console.log(data)
        this.dataNosotros = data;
        this.loadData = true;
      })
  }

  validacionRegistrarse() {
    return true
  }

  mostrarRegistro() {
    this.router.navigate(['/registro'])
  }
}
