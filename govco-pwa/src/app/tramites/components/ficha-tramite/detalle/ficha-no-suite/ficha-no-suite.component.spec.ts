import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaNoSuiteComponent } from './ficha-no-suite.component';

describe('FichaNoSuiteComponent', () => {
  let component: FichaNoSuiteComponent;
  let fixture: ComponentFixture<FichaNoSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaNoSuiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaNoSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
