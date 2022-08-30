import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoCiiuComponent } from './aviso-ciiu.component';

describe('AvisoCiiuComponent', () => {
  let component: AvisoCiiuComponent;
  let fixture: ComponentFixture<AvisoCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
