import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTwoBreadCrumbsComponent } from './level-two-bread-crumbs.component';

describe('LevelTwoBreadCrumbsComponent', () => {
  let component: LevelTwoBreadCrumbsComponent;
  let fixture: ComponentFixture<LevelTwoBreadCrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelTwoBreadCrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelTwoBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
