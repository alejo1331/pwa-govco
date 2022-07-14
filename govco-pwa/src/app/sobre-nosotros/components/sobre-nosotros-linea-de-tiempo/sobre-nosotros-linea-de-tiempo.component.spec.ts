import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosotrosLineaDeTiempoComponent } from './sobre-nosotros-linea-de-tiempo.component';

describe('SobreNosotrosLineaDeTiempoComponent', () => {
  let component: SobreNosotrosLineaDeTiempoComponent;
  let fixture: ComponentFixture<SobreNosotrosLineaDeTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobreNosotrosLineaDeTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreNosotrosLineaDeTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
