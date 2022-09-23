import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanillasUnicasComponent } from './ventanillas-unicas.component';

describe('VentanillasUnicasComponent', () => {
  let component: VentanillasUnicasComponent;
  let fixture: ComponentFixture<VentanillasUnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanillasUnicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanillasUnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
