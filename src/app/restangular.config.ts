import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';

export function RestangularConfigFactory(RestangularProvider, AuthService) {
  RestangularProvider.setBaseUrl('http://localhost:9500');
  // console.log(AuthService);
}

export const RESTANGULAR_AUTH = new InjectionToken<any>('RestangularAuth');
export function RestangularAuthFactory(
  restangular: Restangular,
  authService: AuthService
) {
  return restangular.withConfig(RestangularConfigurer => {
    // console.log(authService);
    RestangularConfigurer.setBaseUrl('http://localhost:9500');
    RestangularConfigurer.addFullRequestInterceptor(
      (element, operation, path, url, headers, params) => {
        // console.log(authService, element, operation, path, url, headers, params, RestangularConfigurer);
        const bearerToken = authService.getBearerToken();

        return {
          headers: Object.assign({}, headers, {
            Authorization: `Bearer ${bearerToken}`
          })
        };
      }
    );
  });
}

export const RESTANGULAR_NOT_AUTH = new InjectionToken<any>(
  'RestangularNotAuth'
);
export function RestangularNotAuthFactory(restangular: Restangular) {
  return restangular.withConfig(RestangularConfigurer => {
    RestangularConfigurer.setBaseUrl('http://localhost:9500');
  });
}
