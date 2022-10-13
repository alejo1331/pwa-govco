import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalesComponent } from './portales.component';

describe('PortalesComponent', () => {
  let component: PortalesComponent;
  let fixture: ComponentFixture<PortalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
