import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionTemasInteresComponent } from './seccion-temas-interes.component';

describe('SeccionTemasInteresComponent', () => {
  let component: SeccionTemasInteresComponent;
  let fixture: ComponentFixture<SeccionTemasInteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionTemasInteresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionTemasInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
