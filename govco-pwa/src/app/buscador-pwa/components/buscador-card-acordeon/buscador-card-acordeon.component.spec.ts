import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardAcordeonComponent } from './buscador-card-acordeon.component';

describe('BuscadorCardAcordeonComponent', () => {
  let component: BuscadorCardAcordeonComponent;
  let fixture: ComponentFixture<BuscadorCardAcordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCardAcordeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
