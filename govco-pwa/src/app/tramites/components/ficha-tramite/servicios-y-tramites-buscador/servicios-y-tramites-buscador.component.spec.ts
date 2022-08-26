import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosYTramitesBuscadorComponent } from './servicios-y-tramites-buscador.component';

describe('ServiciosYTramitesBuscadorComponent', () => {
  let component: ServiciosYTramitesBuscadorComponent;
  let fixture: ComponentFixture<ServiciosYTramitesBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosYTramitesBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosYTramitesBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
