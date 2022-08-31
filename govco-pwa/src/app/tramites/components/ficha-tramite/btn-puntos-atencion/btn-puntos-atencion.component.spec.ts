import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPuntosAtencionComponent } from './btn-puntos-atencion.component';

describe('BtnPuntosAtencionComponent', () => {
  let component: BtnPuntosAtencionComponent;
  let fixture: ComponentFixture<BtnPuntosAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPuntosAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPuntosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
