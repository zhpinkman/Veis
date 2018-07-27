import { RestangularModule, Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';

// Function for setting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, authService) {
  RestangularProvider.setBaseUrl(''); //TODO set base url
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let bearerToken = authService.getBearerToken();

    return {
      headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
    };
  });
}

export const RESTANGULAR_AUTH = new InjectionToken<any>('RestangularAuth');
export function RestangularAuthFactory(restangular: Restangular) {
  return restangular.withConfig((RestangularConfigurer) => {
     RestangularConfigurer.setBaseUrl(''); //TODO set base url
   });

}
