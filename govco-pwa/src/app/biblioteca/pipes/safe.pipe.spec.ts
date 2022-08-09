import { SafePipe } from './safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';
import { TestBed, async } from '@angular/core/testing';
import { CategoriasComponent } from '../categorias/categorias.component';
import { SharedModule } from '../shared/shared.module';

describe('SafePipe', () => {
  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    let pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});