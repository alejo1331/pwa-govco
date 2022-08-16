import { Component, OnInit } from '@angular/core';
import { BottomMenuService } from 'src/app/transversales/services/bottom-menu/bottom-menu.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  bottomService: BottomMenuService;

  constructor(

  ) { }

  ngOnInit(): void {
    this.bottomService.ajustandoPantalla(false);
  }

}
