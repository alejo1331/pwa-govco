// This api will come in the next version


import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';


export const authConfig: AuthConfig = {

  issuer: environment.authIssuer,

  clientId: environment.clientID,

  responseType: 'code',

  // TODO: Descomentar para paso a Producción
  // redirectUri: window.location.origin + '/',
  // postLogoutRedirectUri: window.location.origin + '/',

  // TODO: Descomentar para paso a procucción
  redirectUri: 'https://m.www.gov.co',
  postLogoutRedirectUri: 'https://m.www.gov.co/',


  // Scope qa

  scope: 'co_scope profile openid email',

  //scope: 'profile email openid',


  // Scope Keycloak

  // scope: 'profile email openid',

  useSilentRefresh: true,

  silentRefreshRedirectUri: 'https://m.www.gov.co' + '/silent-refresh.html',

  showDebugInformation: true,

  sessionChecksEnabled: true,

  timeoutFactor: 0.75, // For faster testing 0.75 0.75

  clearHashAfterLogin: false,

  nonceStateSeparator: 'semicolon',

  silentRefreshTimeout: 5000



  //issuer: environment.authIssuer,

  //redirectUri: window.location.origin,

  //silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  //clientId: environment.clientID,

  //responseType: 'code',

  //scope: 'openid co_scope email',

  //useSilentRefresh: true,

  //showDebugInformation: true,

  //sessionChecksEnabled: false,

  //silentRefreshTimeout: 5000, // For faster testing 5000

  //timeoutFactor: 0.01, // For faster testing  0.75 0.01

  //clearHashAfterLogin: false,

  //nonceStateSeparator: 'semicolon'


};


export const authConfigRegister: AuthConfig = {

  issuer: environment.authIssuer,

  clientId: environment.clientID,

  responseType: 'code',

  // redirectUri: window.location.origin + '/',

  // postLogoutRedirectUri: window.location.origin + '/',

  redirectUri: 'https://m.www.gov.co',
  postLogoutRedirectUri: 'https://m.www.gov.co/',


  // Scope qa

  scope: 'co_scope profile openid email',

  //scope: 'profile email openid',


  // Scope Keycloak

  // scope: 'profile email openid',

  useSilentRefresh: true,

  silentRefreshRedirectUri: 'https://m.www.gov.co' + '/silent-refresh.html',

  showDebugInformation: true,

  sessionChecksEnabled: true,

  timeoutFactor: 0.75, // For faster testing 0.75 0.75

  clearHashAfterLogin: false,

  nonceStateSeparator: 'semicolon',

  silentRefreshTimeout: 5000





  // issuer: environment.authIssuer,

  // redirectUri: window.location.origin,

  // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // clientId: environment.clientID,

  // responseType: 'code',

  // scope: 'openid co_scope email',

  // useSilentRefresh: true,

  // showDebugInformation: true,

  // sessionChecksEnabled: false,



};


export const authConfigSilent: AuthConfig = {

  issuer: environment.authIssuer,

  clientId: environment.clientID,

  responseType: 'code',

  // redirectUri: window.location.origin + '/',

  // postLogoutRedirectUri: window.location.origin + '/',

  redirectUri: 'https://m.www.gov.co',
  postLogoutRedirectUri: 'https://m.www.gov.co/',


  // Scope qa

  scope: 'co_scope profile openid email',

  //scope: 'profile email openid',


  // Scope Keycloak

  // scope: 'profile email openid',

  useSilentRefresh: true,

  silentRefreshRedirectUri: 'https://m.www.gov.co' + '/silent-refresh.html',

  showDebugInformation: true,

  sessionChecksEnabled: true,

  timeoutFactor: 0.75, // For faster testing 0.75 0.75

  clearHashAfterLogin: false,

  nonceStateSeparator: 'semicolon',

  silentRefreshTimeout: 5000



  // issuer: environment.authIssuer,

  // redirectUri: window.location.origin,

  // silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

  // clientId: environment.clientID,

  // responseType: 'code',

  // scope: 'openid co_scope email',

  // useSilentRefresh: true,

  // showDebugInformation: true,

  // sessionChecksEnabled: false,

};
