import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaespecificaDetalleComponent } from './fichaespecifica-detalle.component';

describe('FichaespecificaDetalleComponent', () => {
  let component: FichaespecificaDetalleComponent;
  let fixture: ComponentFixture<FichaespecificaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaespecificaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaespecificaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
