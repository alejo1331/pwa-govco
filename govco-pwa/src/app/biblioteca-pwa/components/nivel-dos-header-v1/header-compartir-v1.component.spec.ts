import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCompartirV1Component } from './header-compartir-v1.component';

describe('HeaderCompartirV1Component', () => {
  let component: HeaderCompartirV1Component;
  let fixture: ComponentFixture<HeaderCompartirV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCompartirV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCompartirV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
