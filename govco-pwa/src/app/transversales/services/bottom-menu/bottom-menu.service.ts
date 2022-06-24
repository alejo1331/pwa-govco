import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottomMenuService {

  public lastClickedItem : any;
  public lastPointer : any;
  public backItem :any;
  public backPointerItem :any;

  public quitarActive(){
    const navigation_items_elms : any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer :any = document.querySelector(".navigation-bar .pointer");
    let lefPercent =  this.lastPointer;
    navigation_items_elms.forEach((itm:any) => {
      if (itm.classList.contains("active")){
        itm.classList.remove("active");
        this.backItem = itm;
        this.backPointerItem = navigation_pointer.style.left
      }
    });
    this.lastClickedItem.classList.add("active");
    navigation_pointer.style.left = lefPercent;
    this.lastClickedItem =  this.backItem;
    this.lastPointer = this.backPointerItem;
  }

  public toogleActive(){
    const navigation_items_elms : any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer :any = document.querySelector(".navigation-bar .pointer");

    navigation_items_elms.forEach((item:any, index:any) => {
      item.addEventListener("click", (e:any) => {
        e.preventDefault();
        navigation_items_elms.forEach((itm:any) => {
          if (itm.classList.contains("active")){
            this.lastClickedItem = itm;
            this.lastPointer = navigation_pointer.style.left;
            itm.classList.remove("active");
          }
        });
        item.classList.add("active");
        const parentWidth = item.parentElement.clientWidth;
        const lefPercent = ((parentWidth / navigation_items_elms.length) * index)+10;
        navigation_pointer.style.left = lefPercent + "px";
      });
    });

  }

}
