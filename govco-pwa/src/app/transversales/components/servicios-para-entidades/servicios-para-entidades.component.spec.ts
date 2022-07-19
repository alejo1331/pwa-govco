import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosParaEntidadesComponent } from './servicios-para-entidades.component';

describe('ServiciosParaEntidadesComponent', () => {
  let component: ServiciosParaEntidadesComponent;
  let fixture: ComponentFixture<ServiciosParaEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosParaEntidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosParaEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
