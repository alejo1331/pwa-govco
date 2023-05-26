import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DesplegableDosService } from 'src/app/biblioteca-pwa/services/desplegable-dos/desplegable-dos.service';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';
import { HeaderService } from 'src/app/transversales/services/header-service/header.service';
import { SidenavService } from 'src/app/transversales/services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-detalle-momentos-de-vida',
  templateUrl: './detalle-momentos-de-vida.component.html',
  styleUrls: ['./detalle-momentos-de-vida.component.css']
})
export class DetalleMomentosDeVidaComponent implements OnInit {

  lastY: number = 0;
  @ViewChild('modal_desplegable') modal_desplegable: ElementRef;

  constructor(
    private router: Router,
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService,
    public bottomService: BottomMenuService,
    private service_desplegable: DesplegableDosService
  ) { }

  ngOnInit(): void {
    this.servicioHeader.estadoHeader(true, true);
    this.bottomService.desactivarSeleccion();

    this.bottomService.ajustandoPantalla(false);
    (document.getElementById('topScroll') as HTMLElement).style.top = '3.5rem';
    (document.getElementById('topScroll') as HTMLElement).scrollTop = 0;
  }

  ngAfterViewInit(): void {
    this.service_desplegable.createElement(this.modal_desplegable)
    this.service_desplegable.getPositionInitial();
  }

  @HostListener('touchstart') onTouchStart(): void {
    if (this.modal_desplegable.nativeElement) {
      this.service_desplegable.getPositionTop();
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    if (this.modal_desplegable.nativeElement) {
      const currentY: number = event.changedTouches[0].screenY;

      if (currentY > this.lastY)
        this.service_desplegable.setPositionTop('down');
      else if (currentY < this.lastY)
        this.service_desplegable.setPositionTop('up');

      this.lastY = currentY;
    }
  }


}
