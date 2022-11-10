import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUrlNoDisponibleComponent } from 'src/app/biblioteca-pwa/components/modal-url-no-disponible/modal-url-no-disponible.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidarUrlService {
  servicioUrl = environment.serverUrlValidarUrl;

  constructor(public dialog: MatDialog) {}

  valida(link: string) {
    return new Promise((resolve, reject) => {
      const validarFichaTramites = link.includes('ficha-tramites-y-servicios');

      if (!validarFichaTramites) {
        const url = this.servicioUrl + `/utils/ValidateUrl?url=${link}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          response
            .json()
            .then((resp) => {
              resolve(resp);
            })
            .catch(() => {
              resolve(false);
            });
        });
      } else {
        resolve(false);
      }
    });
  }

  validarUrl(link: string, target: string) {
    if (!(link == '' || link == null)) {
      this.valida(link).then((resp: any) => {
        try {
          if (resp) {
            window.open(link, target == '_blank' ? '_blank' : '_self');
          } else {
            this.abrirModalUrlNoDisponible();
            console.error('No se encuentra Url --> ' + link);
          }
        } catch (error) {
          this.abrirModalUrlNoDisponible();
          console.error('Error validacion Url --> ' + error);
        }
      });
    } else {
      this.abrirModalUrlNoDisponible();
    }
  }

  abrirModalUrlNoDisponible() {
    this.dialog.open(ModalUrlNoDisponibleComponent, {
      width: '280px',
    });
  }
}
