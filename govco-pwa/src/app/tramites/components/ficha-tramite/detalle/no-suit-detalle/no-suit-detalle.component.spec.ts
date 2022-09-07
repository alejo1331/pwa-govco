import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSuitDetalleComponent } from './no-suit-detalle.component';

describe('NoSuitDetalleComponent', () => {
  let component: NoSuitDetalleComponent;
  let fixture: ComponentFixture<NoSuitDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSuitDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSuitDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
