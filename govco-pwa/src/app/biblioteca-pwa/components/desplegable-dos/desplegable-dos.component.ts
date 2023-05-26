import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DesplegableDosService } from '../../services/desplegable-dos/desplegable-dos.service';

@Component({
  selector: 'app-desplegable-dos-govco',
  templateUrl: './desplegable-dos.component.html',
  styleUrls: ['./desplegable-dos.component.css']
})
export class DesplegableDosComponent implements OnInit, AfterViewInit {

  lastY: number = 0;
  @ViewChild('modal_desplegable') modal_desplegable: ElementRef;

  constructor(
    private service_desplegable: DesplegableDosService
  ) { }

  ngOnInit(): void {
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
