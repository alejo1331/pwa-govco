import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasCondicionantesCiiuComponent } from './preguntas-condicionantes-ciiu.component';

describe('PreguntasCondicionantesCiiuComponent', () => {
  let component: PreguntasCondicionantesCiiuComponent;
  let fixture: ComponentFixture<PreguntasCondicionantesCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreguntasCondicionantesCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasCondicionantesCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
