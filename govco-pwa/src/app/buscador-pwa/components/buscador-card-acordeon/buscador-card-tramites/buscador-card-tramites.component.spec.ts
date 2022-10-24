import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardTramitesComponent } from './buscador-card-tramites.component';

describe('BuscadorCardTramitesComponent', () => {
  let component: BuscadorCardTramitesComponent;
  let fixture: ComponentFixture<BuscadorCardTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCardTramitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
