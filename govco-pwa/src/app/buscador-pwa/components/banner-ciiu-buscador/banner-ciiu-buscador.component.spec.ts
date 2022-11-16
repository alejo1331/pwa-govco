import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCiiuBuscadorComponent } from './banner-ciiu-buscador.component';

describe('BannerCiiuBuscadorComponent', () => {
  let component: BannerCiiuBuscadorComponent;
  let fixture: ComponentFixture<BannerCiiuBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCiiuBuscadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCiiuBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
