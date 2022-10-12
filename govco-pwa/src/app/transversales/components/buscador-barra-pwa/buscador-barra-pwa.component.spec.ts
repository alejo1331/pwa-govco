import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorBarraPwaComponent } from './buscador-barra-pwa.component';

describe('BuscadorBarraPwaComponent', () => {
  let component: BuscadorBarraPwaComponent;
  let fixture: ComponentFixture<BuscadorBarraPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorBarraPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorBarraPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
