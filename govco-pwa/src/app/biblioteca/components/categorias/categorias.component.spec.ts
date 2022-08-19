import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchPipe } from '../../pipes/search.pipe';
import { CategoriasService } from '../../services/categorias-service/categorias-service.service';

import { CategoriasComponent } from './categorias.component';

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ CategoriasComponent, SearchPipe],
      providers: [CategoriasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', 
    inject([CategoriasService], (categoriasService: CategoriasService) => {
      fixture = TestBed.createComponent(CategoriasComponent);
      component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    })); 
});
