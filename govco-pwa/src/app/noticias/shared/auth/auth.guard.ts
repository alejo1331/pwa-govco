import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oauthService: OAuthService) {}

  canActivate() {
    if (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    ) {
      console.debug("middleware auth nok");
      return true;
    } else {

    // Tweak config for implicit flow
    // this.oauthService.configure(authConfig);
    // await this.oauthService.loadDiscoveryDocument();
    // sessionStorage.setItem('flow', 'implicit');

    // the parameter here is optional. It's passed around and can be used after logging in
      console.debug("middleware auth ok");


      this.router.navigate(['/', { login: true }]);
      return false;
    }
  }
}
