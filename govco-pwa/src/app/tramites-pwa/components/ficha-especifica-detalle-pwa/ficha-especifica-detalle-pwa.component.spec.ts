import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaDetallePwaComponent } from './ficha-especifica-detalle-pwa.component';

describe('FichaEspecificaDetallePwaComponent', () => {
  let component: FichaEspecificaDetallePwaComponent;
  let fixture: ComponentFixture<FichaEspecificaDetallePwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaDetallePwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaDetallePwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
