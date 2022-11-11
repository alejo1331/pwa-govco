import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tramites-id-acordeon',
  templateUrl: './tramites-id-acordeon.component.html',
  styleUrls: ['./tramites-id-acordeon.component.scss']
})
export class TramitesIdAcordeonComponent {
  @Input() dataAcordeon: { perfil: string, idTramite: number };
  @Input() tramiteEnLinea: boolean;
  @Input() urlManualEnlinea : String;

  public itemActivoAnterior:number;

  activarItem(index:number) {
    const elements = document.querySelectorAll('#acordeonPerfilTramites > .card');
    elements.forEach((element, indexItem) => {
      if (index == indexItem && !element.classList.contains('active')) {
        element.classList.add('active');
        this.onClickItem(index > 0 ? ('paso' + (index-1)) : 'acordeonPerfilTramites');
      } else {
        if (element.classList.contains('active')) { this.itemActivoAnterior = indexItem; }
        element.classList.remove('active');
      }
    });
  }

  onClickItem(item: any) {
    setTimeout(()=>{
      document.getElementById(item)?.scrollIntoView({block: "start", behavior: "smooth"});
    }, 280)
  }
}
