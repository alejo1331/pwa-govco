import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraSuperiorInternaComponent } from './barra-superior-interna.component';

describe('BarraSuperiorInternaComponent', () => {
  let component: BarraSuperiorInternaComponent;
  let fixture: ComponentFixture<BarraSuperiorInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraSuperiorInternaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraSuperiorInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
