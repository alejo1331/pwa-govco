import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { BarraSuperiorComponent } from './barra-superior.component';

describe('BarraSuperiorComponent', () => {
  let component: BarraSuperiorComponent;
  let fixture: ComponentFixture<BarraSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BarraSuperiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Estado inicial "cerrado" del menu lateral', () => {
    expect(component.estadoMenu).toBeFalse();
  });

  it('Clic en el menu hamburguesa y abrir el menu lateral',() => {
    const btnMenu = fixture.debugElement.query(By.css('.menu-hamburgesa-pwa-govco'));
    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeTrue();
  });

  it('Abrir y cerrar menu lateral', () => {

    const btnMenu = fixture.debugElement.query(By.css('span.menu-hamburgesa-pwa-govco'))

    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeTrue();

    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeFalse();
  });
});
