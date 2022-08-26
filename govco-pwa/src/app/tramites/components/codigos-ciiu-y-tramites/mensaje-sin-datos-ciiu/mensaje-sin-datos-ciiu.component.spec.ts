import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeSinDatosCiiuComponent } from './mensaje-sin-datos-ciiu.component';

describe('MensajeSinDatosCiiuComponent', () => {
  let component: MensajeSinDatosCiiuComponent;
  let fixture: ComponentFixture<MensajeSinDatosCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeSinDatosCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeSinDatosCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
