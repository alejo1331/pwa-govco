import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BottomMenuService {

  public lastClickedItem: any;
  public lastPointer: any;
  public backItem: any;
  public backPointerItem: any;

  private pantalla = new BehaviorSubject<boolean>(false);
  public ajustePantalla = this.pantalla.asObservable();

  private bottomMenu = new BehaviorSubject<boolean> (!false);
  public getOcultandoBottomMenu = this.bottomMenu.asObservable();

  private item = new BehaviorSubject<number> (0);
  public getItem = this.item.asObservable();

  LoginNotifier: Subject<null> = new Subject<null>();

  public async putOcultandoBottomMenu( estado: boolean) {
    await this.bottomMenu.next(!estado);
  }

  public async ajustandoPantalla(ajustePantalla: boolean) {
    await this.pantalla.next(ajustePantalla);
  }

  public async seleccionandoItem(seleccionado: number) {
    await this.item.next(seleccionado);
    const navigation_items_elms: any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer: any = document.querySelector(".navigation-bar .pointer");

    await navigation_items_elms.forEach((item: any, index: number) => {
      if (index == seleccionado) {
        navigation_pointer.classList.remove("pointer");
        this.seleccionarItem(navigation_items_elms, navigation_pointer, item, index)
        navigation_pointer.classList.add("pointer");
      }
    })
  }

  public quitarActive() {
    const navigation_items_elms: any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer: any = document.querySelector(".navigation-bar .pointer");
    let lefPercent = this.lastPointer;
    this.quitarClaseActivo(navigation_items_elms, navigation_pointer);
    navigation_pointer.style.left = lefPercent;
    this.lastClickedItem = this.backItem;
    this.lastPointer = this.backPointerItem;
  }

  public toogleActive() {
    const navigation_items_elms: any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer: any = document.querySelector(".navigation-bar .pointer");

    navigation_items_elms.forEach((item: any, index: number) => {
      item.addEventListener("click", (e: any) => {
        e.preventDefault();
        this.seleccionarItem(navigation_items_elms, navigation_pointer, item, index)
      });
    });

  }

  private seleccionarItem(navigation_items_elms: any, navigation_pointer: any, item: any, index: number) {
    this.quitarClaseActivo(navigation_items_elms, navigation_pointer);
    item.classList.add("active");
    const parentWidth = item.parentElement.clientWidth;
    let lefPercent = 0
    if (index != 0){
      lefPercent = ((parentWidth - 280) / 3 ) * index + (70 * index);
    }

    navigation_pointer.style.left = lefPercent + "px";
  }

  private quitarClaseActivo(navigation_items_elms: any, navigation_pointer: any) {
    navigation_items_elms.forEach((itm: any) => {
      if (itm.classList.contains("active")) {
        this.lastClickedItem = itm;
        this.lastPointer = navigation_pointer.style.left;
        itm.classList.remove("active");
      }
    });
  }

  notifyLogin() {
    this.LoginNotifier.next();
  }
}
