import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderBibliotecaService {
  private titleSource = new BehaviorSubject('Biblioteca');
  currentTitle = this.titleSource.asObservable();

  setTitle(categoria: string){
    this.titleSource.next(categoria);
  }

  getTitle(){
    return this.titleSource.value;
  }
}
