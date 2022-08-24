import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOneBreadCrumbsComponent } from './level-one-bread-crumbs.component';

describe('LevelOneBreadCrumbsComponent', () => {
  let component: LevelOneBreadCrumbsComponent;
  let fixture: ComponentFixture<LevelOneBreadCrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelOneBreadCrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelOneBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
