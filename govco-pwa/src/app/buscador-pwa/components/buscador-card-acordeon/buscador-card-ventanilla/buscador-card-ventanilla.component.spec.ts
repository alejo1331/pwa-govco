import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardVentanillaComponent } from './buscador-card-ventanilla.component';

describe('BuscadorCardVentanillaComponent', () => {
  let component: BuscadorCardVentanillaComponent;
  let fixture: ComponentFixture<BuscadorCardVentanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCardVentanillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardVentanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
