import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buscador-card-acordeon',
  templateUrl: './buscador-card-acordeon.component.html',
  styleUrls: ['./buscador-card-acordeon.component.scss'],
})
export class BuscadorCardAcordeonComponent implements OnInit {
  @Input() dataAcordeon: { perfil: string; idTramite: number };
  @Input() tramiteEnLinea: boolean;
  @Input() tramiteTitle: string;

  public itemActivoAnterior: number;

  constructor() {}

  ngOnInit(): void {}

  activarItem(index: number) {
    const elements = document.querySelectorAll(
      '#acordeonPerfilTramites > .card'
    );
    elements.forEach((element, indexItem) => {
      if (index == indexItem && !element.classList.contains('active')) {
        element.classList.add('active');
        this.onClickItem(
          index > 0 ? 'paso' + (index - 1) : 'acordeonPerfilTramites'
        );
      } else {
        if (element.classList.contains('active')) {
          this.itemActivoAnterior = indexItem;
        }
        element.classList.remove('active');
      }
    });
  }

  onClickItem(item: any) {
    setTimeout(() => {
      document
        .getElementById(item)
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 280);
  }
}
