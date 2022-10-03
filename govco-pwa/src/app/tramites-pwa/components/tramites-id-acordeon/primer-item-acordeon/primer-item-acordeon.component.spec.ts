import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerItemAcordeonComponent } from './primer-item-acordeon.component';

describe('PrimerItemAcordeonComponent', () => {
  let component: PrimerItemAcordeonComponent;
  let fixture: ComponentFixture<PrimerItemAcordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerItemAcordeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerItemAcordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
