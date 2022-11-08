import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardPortalesComponent } from './buscador-card-portales.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BuscadorCardPortalesComponent', () => {
  let component: BuscadorCardPortalesComponent;
  let fixture: ComponentFixture<BuscadorCardPortalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCardPortalesComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardPortalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
