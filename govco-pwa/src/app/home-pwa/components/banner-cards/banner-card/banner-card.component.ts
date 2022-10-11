import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent implements OnInit {
  @Input() iconNameClass: string;
  @Input() textNameClass: string;
  @Input() tagName: string;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activateRoute.fragment.subscribe( ( value : any ) => {
    //   this.onClickTag( value );
    // })
  }

  onClickTag(section: any) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
