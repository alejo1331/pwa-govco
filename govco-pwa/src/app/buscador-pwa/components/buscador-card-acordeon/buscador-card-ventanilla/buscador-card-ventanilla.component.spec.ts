import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardVentanillaComponent } from './buscador-card-ventanilla.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BuscadorCardVentanillaComponent', () => {
  let component: BuscadorCardVentanillaComponent;
  let fixture: ComponentFixture<BuscadorCardVentanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCardVentanillaComponent],
      imports: [MatDialogModule],
    }).compileComponents();
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
