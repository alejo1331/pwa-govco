import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardTramitesComponent } from './buscador-card-tramites.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BuscadorCardTramitesComponent', () => {
  let component: BuscadorCardTramitesComponent;
  let fixture: ComponentFixture<BuscadorCardTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorCardTramitesComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
