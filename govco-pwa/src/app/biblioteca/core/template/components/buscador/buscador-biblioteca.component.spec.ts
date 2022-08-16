import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorBibliotecaComponent } from './buscador-biblioteca.component';

describe('BuscadorComponent', () => {
  let component: BuscadorBibliotecaComponent;
  let fixture: ComponentFixture<BuscadorBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorBibliotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
