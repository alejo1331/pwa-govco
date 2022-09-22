import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCardComponent } from './banner-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BannerCardComponent', () => {
  let component: BannerCardComponent;
  let fixture: ComponentFixture<BannerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});
