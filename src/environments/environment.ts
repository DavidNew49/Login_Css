// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shapeLogo: 'rectangle', //circle
  companyLogo: 'logo_new.png',
  // baseUrl: '/',
  apiUrl: 'https://localhost:7204/api/',
  // apiUrl: '/api/',
  apiAuth: 'https://localhost:7204/api/User/Login',
  // apiAuth: 'http://localhost:50951/api/account/loginad/',
  localStorageTokenKey: 'base',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
