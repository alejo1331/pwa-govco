import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchPipe } from '../../pipes/search.pipe';
import { PublicacionesService } from '../../services/publicaciones-service/publicaciones-service.service';

import { BibliotecaComponent } from './biblioteca.component';

describe('HomeComponent', () => {
  let component: BibliotecaComponent;
  let fixture: ComponentFixture<BibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliotecaComponent, SearchPipe ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController, PublicacionesService],
    (httpMock: HttpTestingController, publicacionesService: PublicacionesService) => {
      expect(publicacionesService).toBeTruthy();
    })
);
}); 
