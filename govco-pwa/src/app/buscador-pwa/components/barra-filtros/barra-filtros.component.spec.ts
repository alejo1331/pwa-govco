import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BarraFiltrosComponent } from './barra-filtros.component';

describe('BarraFiltrosComponent', () => {
  let component: BarraFiltrosComponent;
  let fixture: ComponentFixture<BarraFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarraFiltrosComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validación incial total resultados 0', () => {
    expect(component.totalFiltros).toEqual(0);
  });
});
