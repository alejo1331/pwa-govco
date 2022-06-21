import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.css']
})
export class BottomMenuComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const navigation_items_elms : any = document.querySelectorAll(".navigation-bar .list-items .item");
    const navigation_pointer :any = document.querySelector(".navigation-bar .pointer");

    navigation_items_elms.forEach((item:any, index:any) => {
      item.addEventListener("click", (e:any) => {
        e.preventDefault();
        navigation_items_elms.forEach((itm:any) => {
          if (itm.classList.remove("active")){
            itm.childNodes[0].childNodes[0].classList.add("material-icons-outlined");

          itm.childNodes[0].childNodes[0].classList.remove("material-icons");
          itm.classList.remove("active");
          }
        });
        item.classList.add("active");
        const parentWidth = item.parentElement.clientWidth;
        const lefPercent = ((parentWidth / navigation_items_elms.length) * index)+20;
        navigation_pointer.style.left = lefPercent + "px";

      });
    });

  }

}
