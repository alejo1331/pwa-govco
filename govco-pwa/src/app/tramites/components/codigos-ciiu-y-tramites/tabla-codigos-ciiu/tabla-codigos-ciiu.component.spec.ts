import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCodigosCiiuComponent } from './tabla-codigos-ciiu.component';

describe('TablaCodigosCiiuComponent', () => {
  let component: TablaCodigosCiiuComponent;
  let fixture: ComponentFixture<TablaCodigosCiiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCodigosCiiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaCodigosCiiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
