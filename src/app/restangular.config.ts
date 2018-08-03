import { RestangularModule, Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';

// Function for setting the default restangular configuration
export function RestangularConfigFactory(RestangularProvider, AuthService) {
  RestangularProvider.setBaseUrl('http://localhost:9500'); //TODO set base url
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    // console.log(AuthService, element, operation, path, url, headers, params, RestangularProvider);
    if (AuthService) {
      const bearerToken = AuthService.getBearerToken();

      return {
        headers: Object.assign({}, headers, { Authorization: `Bearer ${bearerToken}` })
      };
    }
    return {};
  });
}

export const RESTANGULAR_AUTH = new InjectionToken<any>('RestangularAuth');
export function RestangularAuthFactory(restangular: Restangular) {
  return restangular.withConfig(RestangularConfigurer => {
    console.log('rest config');
    RestangularConfigurer.setBaseUrl('http://localhost:9500'); //TODO set base url
    // RestangularConfigurer.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    //   console.log('test');
    // }); x
  });
}
