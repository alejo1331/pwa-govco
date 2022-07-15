import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesMasConsultadosComponent } from './tramites-mas-consultados.component';

describe('TramitesMasConsultadosComponent', () => {
  let component: TramitesMasConsultadosComponent;
  let fixture: ComponentFixture<TramitesMasConsultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesMasConsultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesMasConsultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
