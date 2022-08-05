import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aviso-de-construccion',
  templateUrl: './aviso-de-construccion.component.html',
  styleUrls: ['./aviso-de-construccion.component.css']
})
export class AvisoDeConstruccionComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    document.getElementsByClassName('govco-pwa-content')[0].classList.add('govco-construccion')
  }

  ngOnDestroy():void{
    document.getElementsByClassName('govco-pwa-content')[0].classList.remove('govco-construccion')
  }



}
