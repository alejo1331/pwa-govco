import { SearchPipe } from './search.pipe';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';
import { CategoriasComponent } from '../categorias/categorias.component';

describe('SearchPipe', () => {
  it('create an instance', () => {
    let pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });
});
