import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMomentosComponent } from './detalle-momentos.component';

describe('DetalleMomentosComponent', () => {
  let component: DetalleMomentosComponent;
  let fixture: ComponentFixture<DetalleMomentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMomentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMomentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
