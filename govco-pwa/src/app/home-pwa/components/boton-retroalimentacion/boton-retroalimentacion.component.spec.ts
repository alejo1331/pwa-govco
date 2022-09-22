import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonRetroalimentacionComponent } from './boton-retroalimentacion.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BotonRetroalimentacionComponent', () => {
  let component: BotonRetroalimentacionComponent;
  let fixture: ComponentFixture<BotonRetroalimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonRetroalimentacionComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonRetroalimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
