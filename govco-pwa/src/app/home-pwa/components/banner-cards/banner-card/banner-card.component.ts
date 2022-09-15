import { Component, OnInit, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent implements OnInit {

  @Input() iconNameClass: string;
  @Input() textNameClass: string;
  @Input() tagName: string;

  constructor(private router: Router, private scroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  // onClickTag (): void { 
  //    this.router.navigate( [], { fragment: this.tagName } );
  //   this.scroller.scrollToAnchor(this.tagName);
  // }
}
