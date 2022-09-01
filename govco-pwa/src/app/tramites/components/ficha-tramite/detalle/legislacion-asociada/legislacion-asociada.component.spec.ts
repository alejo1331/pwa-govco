import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislacionAsociadaComponent } from './legislacion-asociada.component';

describe('LegislacionAsociadaComponent', () => {
  let component: LegislacionAsociadaComponent;
  let fixture: ComponentFixture<LegislacionAsociadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegislacionAsociadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislacionAsociadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
