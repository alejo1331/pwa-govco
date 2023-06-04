import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoSinResultadosComponent } from './aviso-sin-resultados.component';

describe('AvisoSinResultadosComponent', () => {
  let component: AvisoSinResultadosComponent;
  let fixture: ComponentFixture<AvisoSinResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoSinResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoSinResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
