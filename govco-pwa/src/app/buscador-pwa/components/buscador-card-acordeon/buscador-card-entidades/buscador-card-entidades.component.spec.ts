import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardEntidadesComponent } from './buscador-card-entidades.component';

describe('BuscadorCardEntidadesComponent', () => {
  let component: BuscadorCardEntidadesComponent;
  let fixture: ComponentFixture<BuscadorCardEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCardEntidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
