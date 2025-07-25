import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  inject,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { apiInterceptor } from './core/interceptors/api-interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TenantConfigService } from './core/services/tenant-config.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor])),
    {
      provide: APP_INITIALIZER,
      useValue: () => {
        const tenantService = inject(TenantConfigService);
        return tenantService.loadConfig();
      },
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   useFactory: () => {
    //     const iconRegistry = inject(MatIconRegistry);
    //     const sanitizer = inject(DomSanitizer);
    //     return () => {
    //       iconRegistry.registerFontClassAlias('material-symbols-outlined');
    //       iconRegistry.registerFontClassAlias('material-icons');
    //       iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    //     };
    //   },
    // },
  ],
};
