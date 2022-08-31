import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTramiteLineaComponent } from './btn-tramite-linea.component';

describe('BtnTramiteLineaComponent', () => {
  let component: BtnTramiteLineaComponent;
  let fixture: ComponentFixture<BtnTramiteLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnTramiteLineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnTramiteLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
