import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorAvisoComponent } from './buscador-aviso.component';

describe('BuscadorAvisoComponent', () => {
  let component: BuscadorAvisoComponent;
  let fixture: ComponentFixture<BuscadorAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorAvisoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
