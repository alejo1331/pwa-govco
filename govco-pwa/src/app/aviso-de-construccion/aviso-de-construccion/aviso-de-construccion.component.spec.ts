import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoDeConstruccionComponent } from './aviso-de-construccion.component';

describe('AvisoDeConstruccionComponent', () => {
  let component: AvisoDeConstruccionComponent;
  let fixture: ComponentFixture<AvisoDeConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoDeConstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoDeConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
