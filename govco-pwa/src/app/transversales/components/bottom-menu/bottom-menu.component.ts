import { Component, OnInit, AfterViewInit} from '@angular/core';
import { BottomMenuService } from '../../services/bottom-menu/bottom-menu.service';
import { HeaderService } from '../../services/header-service/header.service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service.service';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit, AfterViewInit {

  constructor(
    public bottomMenu : BottomMenuService, 
    protected servicioSideNav: SidenavService,
    protected servicioHeader: HeaderService
    ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.bottomMenu.toogleActive()
  }

}
