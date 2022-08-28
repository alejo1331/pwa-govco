import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private oauthService: OAuthService,
    private router: Router) { }

    async ngOnInit() {
      await this.oauthService.loadDiscoveryDocument();
      this.oauthService.revokeTokenAndLogout();
      this.router.navigate(['/']);
    }

}
