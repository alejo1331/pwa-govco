import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BarraSuperiorGeneralComponent } from './barra-superior-general.component';

describe('BarraSuperiorGeneralComponent', () => {
  let component: BarraSuperiorGeneralComponent;
  let fixture: ComponentFixture<BarraSuperiorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        BarraSuperiorGeneralComponent
      ]
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

  it('Estado inicial "cerrado" del menu lateral', () => {
    expect(component.estadoMenu).toBeFalse();
  });

  it('Clic en el menu hamburguesa y abrir el menu lateral', () => {
    const btnMenu = fixture.debugElement.query(By.css('span.menu-hamburgesa-pwa-govco'))
    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeTrue();
  });

  it('Abrir y cerrar menu lateral', () => {
    const btnMenu = fixture.debugElement.query(By.css('span.menu-hamburgesa-pwa-govco'))

    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeTrue();
    console.log("Estado del menu", component.estadoMenu);

    btnMenu.nativeElement.click();
    expect(component.estadoMenu).toBeFalse();
    console.log("Estado del menu", component.estadoMenu);
  });

});
