import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss'],
})
export class BannerCardComponent {
  @Input() iconNameClass: string;
  @Input() textNameClass: string;
  @Input() tagName: string;

  onClickTag(section: any) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
