import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionFormularioComponent } from './accion-formulario.component';

describe('AccionFormularioComponent', () => {
  let component: AccionFormularioComponent;
  let fixture: ComponentFixture<AccionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
