import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCardNoticiasComponent } from './buscador-card-noticias.component';

describe('BuscadorCardNoticiasComponent', () => {
  let component: BuscadorCardNoticiasComponent;
  let fixture: ComponentFixture<BuscadorCardNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorCardNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorCardNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
