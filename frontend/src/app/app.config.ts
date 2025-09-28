import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),                 // <--- fornece HttpClient para injeção
    importProvidersFrom(ReactiveFormsModule) // <--- fornece ReactiveForms para módulos Ng (se você usa NgModule)
  ]
};
