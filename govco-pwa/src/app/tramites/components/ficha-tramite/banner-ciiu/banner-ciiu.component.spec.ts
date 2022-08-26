import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCiiuComponent } from './banner-ciiu.component';

describe('BannerCiiuComponent', () => {
  let component: BannerCiiuComponent;
  let fixture: ComponentFixture<BannerCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
