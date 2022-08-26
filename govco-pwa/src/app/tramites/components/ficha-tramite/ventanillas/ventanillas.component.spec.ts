import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanillasComponent } from './ventanillas.component';

describe('VentanillasComponent', () => {
  let component: VentanillasComponent;
  let fixture: ComponentFixture<VentanillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
