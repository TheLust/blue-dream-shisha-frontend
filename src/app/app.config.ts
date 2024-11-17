import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiModule, Configuration, ConfigurationParameters } from './api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './interceptor/http-error.interceptor';
import { BlueDreamShishaErrorHandler } from './error_handler/blue-dream-shisha-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    ),
    importProvidersFrom(ApiModule.forRoot(apiConfigFactory)),
    {provide: ErrorHandler, useClass: BlueDreamShishaErrorHandler}
  ]
};

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: "http://localhost:8080",
  };
  return new Configuration(params);
}
