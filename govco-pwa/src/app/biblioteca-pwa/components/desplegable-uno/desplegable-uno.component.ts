import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-desplegable-uno',
  templateUrl: './desplegable-uno.component.html',
  styleUrls: ['./desplegable-uno.component.css']
})
export class DesplegableUnoComponent implements OnInit {

  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;

  itemSelected:number;


  constructor() { }

  ngOnInit(): void {
  }

  seleccionarItem(dataItem: number){
    this.itemSelected = dataItem;
  }

  abrirModal() {
    var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
    espaldar.style.zIndex = '3';
    espaldar.style.opacity = '1';
    espaldar.style.backgroundColor = '#00000080'
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    body.style.overscrollBehavior = 'contain';
    var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
    contenedor.style.bottom = '24.5rem';
    contenedor.style.transition = '0.6s';
  }

  cerrarModal() {
    var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
    espaldar.style.zIndex = '-1'
    espaldar.style.opacity = '0';
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    setTimeout(() => {
      body.style.overscrollBehavior = 'auto'
    }, 500);
    var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
    contenedor.style.bottom = '0';
    contenedor.style.transition = '0.6s'
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any): void {
    var button = document.getElementById('modalDesplegable')
    var hr = (document.getElementsByTagName('hr') as HTMLCollectionOf<HTMLElement>)[1];
    if (button == event.target || hr == event.target) {
      this.touchMoveInicial = event.changedTouches[0].screenY;
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: any): void {
    var button = document.getElementById('modalDesplegable');
    var hr = (document.getElementsByTagName('hr') as HTMLCollectionOf<HTMLElement>)[1];
    if (button == event.target || hr == event.target) {
      this.touchMoveFinal = event.changedTouches[0].screenY;

      if (this.touchMoveInicial < this.touchMoveFinal) {
        this.cerrarModal()
      } else {
        this.abrirModal();
      }
    }

  }

}
