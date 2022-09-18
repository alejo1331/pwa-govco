import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SeccionTemasInteresComponent } from './seccion-temas-interes.component';
import { HomeService } from '../../services/home.service';

describe('SeccionTemasInteresComponent', () => {
  let component: SeccionTemasInteresComponent;
  let fixture: ComponentFixture<SeccionTemasInteresComponent>;
  let homeService: HomeService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionTemasInteresComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionTemasInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    homeService = new HomeService(httpClientSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
