import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

constructor() { }

checkLoginUser(){
  return localStorage.getItem('id_token_claims_obj')
}

}
