import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosAtencionModalComponent } from './puntos-atencion-modal.component';

describe('PuntosAtencionModalComponent', () => {
  let component: PuntosAtencionModalComponent;
  let fixture: ComponentFixture<PuntosAtencionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosAtencionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosAtencionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
