import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionEmergenteComponent } from './descripcion-emergente.component';

describe('DescripcionEmergenteComponent', () => {
  let component: DescripcionEmergenteComponent;
  let fixture: ComponentFixture<DescripcionEmergenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionEmergenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionEmergenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
