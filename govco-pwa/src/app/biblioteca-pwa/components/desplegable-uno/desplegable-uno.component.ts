import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'app-desplegable-uno',
  templateUrl: './desplegable-uno.component.html',
  styleUrls: ['./desplegable-uno.component.css']
})
export class DesplegableUnoComponent implements OnInit {

  active = 1;
  @Input() data: any[];
  // @Input() tramite: any;
  @Output() cargarDetalleMomento =  new EventEmitter<any>();
  @Output() cargarMomentosAudiencia =  new EventEmitter<any>();

  touchMoveInicial: number = 0;
  touchMoveFinal: number = 0;
  touchMoveDiferencia: number = 0;

  itemSelected:number;


  constructor(
    public platform: Platform,

  ) { }

  ngOnInit(): void {
    console.log('data',this.data)
  }

  seleccionarItem(dataItem: number){
    this.itemSelected = dataItem;
  }

  abrirModal() {
    var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
    espaldar.style.zIndex = '5';
    espaldar.style.opacity = '1';
    espaldar.style.backgroundColor = '#00000080'
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    body.style.overscrollBehavior = 'contain';
    var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
    contenedor.style.bottom = '0';
    contenedor.style.transition = '0.6s';
    if (this.platform.IOS || this.platform.SAFARI) {
      body.style.position = 'fixed';
      body.style.overflow = 'hidden';
    }
  }

  cerrarModal() {
    var espaldar = (document.getElementById('espaldarModal') as HTMLElement);
    espaldar.style.zIndex = '-1'
    espaldar.style.opacity = '0';
    var body = (document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>)[0];
    setTimeout(() => { body.style.overscrollBehavior = 'auto' }, 500);
    var contenedor = (document.querySelector('.modal-desplegable-pwa.contenedor') as HTMLElement);
    contenedor.style.bottom = '-25.125rem';
    contenedor.style.transition = '0.6s'
    if (this.platform.IOS || this.platform.SAFARI) {
      body.style.removeProperty('position')
      body.style.removeProperty('overflow')
    }
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
