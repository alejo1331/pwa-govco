import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaPwaComponent } from './ficha-especifica-pwa.component';

describe('FichaEspecificaPwaComponent', () => {
  let component: FichaEspecificaPwaComponent;
  let fixture: ComponentFixture<FichaEspecificaPwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaEspecificaPwaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaPwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
