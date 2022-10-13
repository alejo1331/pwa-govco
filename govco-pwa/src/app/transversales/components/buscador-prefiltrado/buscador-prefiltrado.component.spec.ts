import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPrefiltradoComponent } from './buscador-prefiltrado.component';

describe('BuscadorPrefiltradoComponent', () => {
  let component: BuscadorPrefiltradoComponent;
  let fixture: ComponentFixture<BuscadorPrefiltradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorPrefiltradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPrefiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
