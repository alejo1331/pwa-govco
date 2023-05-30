import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentosDeVidaCardComponent } from './momentos-de-vida-card.component';

describe('MomentosDeVidaCardComponent', () => {
  let component: MomentosDeVidaCardComponent;
  let fixture: ComponentFixture<MomentosDeVidaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentosDeVidaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentosDeVidaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
