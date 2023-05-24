import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMomentosDeVidaComponent } from './detalle-momentos-de-vida.component';

describe('DetalleMomentosDeVidaComponent', () => {
  let component: DetalleMomentosDeVidaComponent;
  let fixture: ComponentFixture<DetalleMomentosDeVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMomentosDeVidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMomentosDeVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
