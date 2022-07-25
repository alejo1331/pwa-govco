import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoNoticiasFiltroComponent } from './listado-noticias-filtro.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ListadoNoticiasFiltroComponent', () => {
  let component: ListadoNoticiasFiltroComponent;
  let fixture: ComponentFixture<ListadoNoticiasFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ListadoNoticiasFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoNoticiasFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
