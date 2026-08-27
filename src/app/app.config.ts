import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { ExhibitStore } from './services/exhibit-store';

/** Root dependency-injection and router configuration for the kiosk application. */
export const appConfig: ApplicationConfig = {
  providers: [
    // Instantiate the store during startup so exhibit data begins loading immediately.
    provideAppInitializer(() => void inject(ExhibitStore)),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
