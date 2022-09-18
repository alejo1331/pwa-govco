import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SeccionActualidadComponent } from './seccion-actualidad.component';
import { HomeService } from '../../services/home.service';

describe('SeccionActualidadComponent', () => {
  let component: SeccionActualidadComponent;
  let fixture: ComponentFixture<SeccionActualidadComponent>;
  let homeService: HomeService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionActualidadComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionActualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    homeService = new HomeService(httpClientSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
