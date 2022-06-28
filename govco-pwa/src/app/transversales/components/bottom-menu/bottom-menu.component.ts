import { Component, OnInit, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit, AfterViewInit {

  @Output() outBarraSuInterna = new EventEmitter<boolean>();

  constructor(private elementRef:ElementRef,
    public bottomMenu : BottomMenuService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bottomMenu.toogleActive()
  }

  barraSuperiorInterna(opcion: boolean){
    this.outBarraSuInterna.emit(opcion);
  }

}
