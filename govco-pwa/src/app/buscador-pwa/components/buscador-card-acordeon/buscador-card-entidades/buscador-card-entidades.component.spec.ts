import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardEntidadesComponent } from './buscador-card-entidades.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BuscadorCardEntidadesComponent', () => {
  let component: BuscadorCardEntidadesComponent;
  let fixture: ComponentFixture<BuscadorCardEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCardEntidadesComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
