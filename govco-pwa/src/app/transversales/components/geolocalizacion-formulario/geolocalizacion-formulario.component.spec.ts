import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { GeolocalizacionFormularioComponent } from './geolocalizacion-formulario.component';

describe('GeolocalizacionFormularioComponent', () => {
  let component: GeolocalizacionFormularioComponent;
  let fixture: ComponentFixture<GeolocalizacionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ GeolocalizacionFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formilario invalido', () => {
    const selectDepartamento = component.registerForm.controls['codigoDepartamento'];
    selectDepartamento.setValue('50')
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('Debe retornar formilario valido', () => {
    const selectDepartamento = component.registerForm.controls['codigoDepartamento'];
    const selectMunicipio = component.registerForm.controls['codigoMunicipio'];
    selectDepartamento.setValue('50')
    selectMunicipio.setValue('50001')

    expect(component.registerForm.invalid).toBeFalse();
  });

  it('Debe cerrar el formulario al dar click al boton atras', () => {

    const btnAtras = fixture.debugElement.query(By.css('div.caja-pwa-govco-back-arrow'));
    btnAtras.nativeElement.click();

    const cerrarModal = ["translate(100%)", 'translate(0%)'];

    expect(component.cerrarModal).toEqual(cerrarModal);
  });

  it('Debe cerrar el formulario al dar click guardar ubicacion', () => {
    const selectDepartamento = component.registerForm.controls['codigoDepartamento'];
    const selectMunicipio = component.registerForm.controls['codigoMunicipio'];
    selectDepartamento.setValue('50');
    selectMunicipio.setValue('50001');

    const btnGuardar = fixture.debugElement.query(By.css('.boton-pwa-govco'));
    btnGuardar.nativeElement.click();

    const cerrarModal = ["translate(100%)", 'translate(0%)'];

    expect(component.cerrarModal).toEqual(cerrarModal);
  });
});
