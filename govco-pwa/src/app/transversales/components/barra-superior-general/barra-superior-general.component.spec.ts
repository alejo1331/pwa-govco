import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraSuperiorGeneralComponent } from './barra-superior-general.component';

describe('BarraSuperiorGeneralComponent', () => {
  let component: BarraSuperiorGeneralComponent;
  let fixture: ComponentFixture<BarraSuperiorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraSuperiorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraSuperiorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
