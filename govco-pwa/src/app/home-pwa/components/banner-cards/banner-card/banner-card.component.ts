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
    const element = document.getElementById(section);    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      const focusableElement = <HTMLElement>element.querySelector(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
      focusableElement?.focus();
    }
  }
}
