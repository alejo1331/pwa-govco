import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.css']
})
export class SigninOidcComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('------------INICIO---------');
    this.router.navigate(['/acerca-del-portal']);
    console.log('------------FIN---------');
  }

}
