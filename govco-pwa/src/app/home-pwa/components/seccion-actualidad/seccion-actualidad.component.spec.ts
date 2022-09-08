import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionActualidadComponent } from './seccion-actualidad.component';

describe('SeccionActualidadComponent', () => {
  let component: SeccionActualidadComponent;
  let fixture: ComponentFixture<SeccionActualidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionActualidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionActualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
