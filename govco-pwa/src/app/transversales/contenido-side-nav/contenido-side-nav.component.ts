import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido-side-nav',
  templateUrl: './contenido-side-nav.component.html',
  styleUrls: ['./contenido-side-nav.component.css']
})
export class ContenidoSideNavComponent implements OnInit {

  selectedIcon = 'outlined';

  constructor() { }

  ngOnInit() {
  }

  status: boolean = false;
  renderer: any;
clickEvent(){
  console.log(this.status)
    this.status = !this.status;
}


cambioIconos(event: any) {
  var element_target = event.target.offsetParent.getElementsByClassName("material-icons-outlined")[0].classList;
  const hasClass = element_target[0] == 'material-icons-outlined'
  if(hasClass) {
    element_target.add('material-icons');
    element_target.remove('material-icons-outlined');
  } else {
    element_target.add('material-icons-outlined');
    element_target.add('material-icons');
  }
}
}
