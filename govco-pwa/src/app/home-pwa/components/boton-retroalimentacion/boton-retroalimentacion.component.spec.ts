import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRetroalimentacionComponent } from './boton-retroalimentacion.component';

describe('BotonRetroalimentacionComponent', () => {
  let component: BotonRetroalimentacionComponent;
  let fixture: ComponentFixture<BotonRetroalimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonRetroalimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonRetroalimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
