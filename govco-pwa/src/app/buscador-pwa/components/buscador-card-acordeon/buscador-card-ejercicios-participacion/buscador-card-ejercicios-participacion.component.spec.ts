import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardEjerciciosParticipacionComponent } from './buscador-card-ejercicios-participacion.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BuscadorCardEjerciciosParticipacionComponent', () => {
  let component: BuscadorCardEjerciciosParticipacionComponent;
  let fixture: ComponentFixture<BuscadorCardEjerciciosParticipacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCardEjerciciosParticipacionComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      BuscadorCardEjerciciosParticipacionComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
