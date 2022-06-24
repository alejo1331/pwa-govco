import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipaComponent } from './participa.component';

describe('ParticipaComponent', () => {
  let component: ParticipaComponent;
  let fixture: ComponentFixture<ParticipaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
