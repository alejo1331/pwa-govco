import { Directive, ElementRef, HostBinding, HostListener, Input, SimpleChanges } from '@angular/core';
import { ValidarUrlService } from 'src/app/services/validar-url.service';

@Directive({
  selector: '[appValidarUrl]'
})
export class ValidarUrlDirective {

  constructor(
    private element: ElementRef,
    private validarUrlService: ValidarUrlService) {
    // this.element.nativeElement.title = "Abre en una nueva ventana"
    this.element.nativeElement.alt = "Abre en una nueva ventana"
    console.log(this.element.nativeElement);
    

    if(!this.element.nativeElement.title){
      this.element.nativeElement.setAttribute("title", "Abre en una nueva ventana");
    }

    if(!this.element.nativeElement.alt){
      this.element.nativeElement.setAttribute("alt", "Abre en una nueva ventana.1111");
    }
  }

  @Input()
   @HostBinding('href')
   href ? : string;

   @HostListener("click", ["$event"])
   public onClick(event: any): void {
      event.preventDefault();
      this.validarUrlService.openLink(this.href); 
   }

   ngOnChanges(changes: SimpleChanges) {
     
     if (changes.href) {
     
      //  const isExternal = this.isLinkExternal();
      //  this.rel = isExternal ? 'noopener' : '';
      //  this.target = isExternal ? '_blank' : '_self';
    }
 }

}
