import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaInformativaComponent } from './tarjeta-informativa.component';

describe('TarjetaInformativaComponent', () => {
  let component: TarjetaInformativaComponent;
  let fixture: ComponentFixture<TarjetaInformativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaInformativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaInformativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
