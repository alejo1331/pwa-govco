import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasServiceService } from 'src/app/noticias/services/noticias-service.service';
import { NoticiaPublicadaModel } from 'src/app/noticias/models/noticiaPublicadaModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ValidarUrlService } from 'src/app/noticias/services/validar-url.service';

@Component({
  selector: 'noticias-govco-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.scss']
})
export class DetalleNoticiasComponent implements OnInit {

  
  valor:number=10;
  public idRecurso: any;
  noticiasError: boolean = false;
  loadingInfo: boolean = true;
 noticia: NoticiaPublicadaModel;
  dataHtml:SafeUrl;
  dom:HTMLElement;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private elem: ElementRef,
    private validarUrlService:ValidarUrlService,
    private noticiasService: NoticiasServiceService) {
      this.dom = this.elem.nativeElement;
      
     }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.activatedRoute.url.subscribe(() => {
      this.idRecurso = this.activatedRoute.snapshot.paramMap.get('id');
      this.obtenerDetalleNoticia();
    });
  }

  obtenerDetalleNoticia() {
    this.noticiasService.obtenerDetalleNoticia(this.idRecurso).subscribe(
      (data: NoticiaPublicadaModel) => {
        this.loadingInfo = false;
        
        if(data.cuerpoTexto.includes("href")){          
          const textoHtml = data.cuerpoTexto;
          this.dataHtml  =  this.sanitizer.bypassSecurityTrustHtml(textoHtml);
          setTimeout(()=>{
            const elements = this.dom.querySelectorAll('.p-content a[href]');
            
            elements.forEach( item=> {
              item.addEventListener('click', (event)=>{
                event.preventDefault();
                this.validarUrlService.openLink(item.getAttribute("href"));  
              });
            })
        }, 500)}

        this.noticia = data;
        
      },
      (error) => {
        //TODO: mostrar error
        this.noticiasError = true;
        this.loadingInfo = false;
      }
    );
  }
}
