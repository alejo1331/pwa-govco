import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFiltrosComponent } from './barra-filtros.component';

describe('BarraFiltrosComponent', () => {
  let component: BarraFiltrosComponent;
  let fixture: ComponentFixture<BarraFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraFiltrosComponent ]
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
});
