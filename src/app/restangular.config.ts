import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { HttpHeaders } from '@angular/common/http';

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
    var refreshAccesstoken = function() {
      // Here you can make action before repeated request
      return authService.refreshToken();
    };

    RestangularConfigurer.addErrorInterceptor(
      (response, subject, responseHandler) => {
        console.log(response);
        if (response.status === 401) {
          refreshAccesstoken()
            .switchMap(refreshAccesstokenResponse => {
              //If you want to change request or make with it some actions and give the request to the repeatRequest func.
              //Or you can live it empty and request will be the same.

              // update Authorization header
              const newHeaders = new HttpHeaders({
                Authorization: 'Bearer ' + refreshAccesstokenResponse
              });
              const newReq = response.request.clone({ headers: newHeaders });
              // console.log('160', this.accessToken, newReq);
              return response.repeatRequest(newReq);
            })
            .subscribe(res => responseHandler(res), err => subject.error(err));

          return false; // error handled
        }
        return true; // error not handled
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
