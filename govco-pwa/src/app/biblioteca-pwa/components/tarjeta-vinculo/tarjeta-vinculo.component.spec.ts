import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaVinculoComponent } from './tarjeta-vinculo.component';

describe('TarjetaVinculoComponent', () => {
  let component: TarjetaVinculoComponent;
  let fixture: ComponentFixture<TarjetaVinculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaVinculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaVinculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
