import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaHerramientasComponent } from './caja-herramientas.component';

describe('CajaHerramientasComponent', () => {
  let component: CajaHerramientasComponent;
  let fixture: ComponentFixture<CajaHerramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaHerramientasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
