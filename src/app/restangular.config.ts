import { Restangular } from 'ngx-restangular';
import { InjectionToken } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ConstService } from '@app/Services/const.service';
import { environment } from 'environments/environment.prod';

let host: string;
if (environment.production) host = 'http://142.93.66.250/api';
else host = 'http://localhost:9500';

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl(host);
  // console.log(AuthService);
}

export const RESTANGULAR_AUTH = new InjectionToken<any>('RestangularAuth');
export function RestangularAuthFactory(
  restangular: Restangular,
  authService: AuthService
) {
  return restangular.withConfig(RestangularConfigurer => {
    // console.log(authService);
    RestangularConfigurer.setBaseUrl(host);
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
            .pipe(
              switchMap(refreshAccesstokenResponse => {
                //If you want to change request or make with it some actions and give the request to the repeatRequest func.
                //Or you can live it empty and request will be the same.

                // update Authorization header
                const newHeaders = new HttpHeaders({
                  Authorization: 'Bearer ' + refreshAccesstokenResponse
                });
                const newReq = response.request.clone({
                  headers: newHeaders
                });
                // console.log('160', this.accessToken, newReq);
                return response.repeatRequest(newReq);
              })
            )
            .subscribe(
              res => responseHandler(res),
              err => {
                subject.error(err);
                authService.requestLogout();
              }
            );

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
    RestangularConfigurer.setBaseUrl(host);
  });
}
