import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentosDeVidaComponent } from './momentos-de-vida.component';

describe('MomentosDeVidaComponent', () => {
  let component: MomentosDeVidaComponent;
  let fixture: ComponentFixture<MomentosDeVidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentosDeVidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentosDeVidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
