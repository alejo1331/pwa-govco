import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDelSitioComponent } from './mapa-del-sitio.component';

describe('MapaDelSitioComponent', () => {
  let component: MapaDelSitioComponent;
  let fixture: ComponentFixture<MapaDelSitioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaDelSitioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaDelSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
