import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nivel-dos-header-prefiltros',
  templateUrl: './nivel-dos-header-prefiltros.component.html',
  styleUrls: ['./nivel-dos-header-prefiltros.component.scss']
})
export class NivelDosHeaderPrefiltrosComponent implements OnInit {
  @Input() public tramiteIndex: number;
  constructor() { }

  ngOnInit() {
    let tramiteSelected = document.getElementsByClassName('govco-pwa-prefiltro-element')[this.tramiteIndex]
    tramiteSelected.classList.add('active');
  }

  changePrefilter(index:number){
   let currentActive = document.getElementsByClassName('active')[0];
   if (currentActive){
    currentActive.classList.remove('active')
   }
   let activePrefilter = document.getElementsByClassName('govco-pwa-prefiltro-element')[index]
   activePrefilter.classList.add('active')
  }

}
