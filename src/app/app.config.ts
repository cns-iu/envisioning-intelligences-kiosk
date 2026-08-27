import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  RedirectCommand,
  Router,
  withComponentInputBinding,
  withInMemoryScrolling,
  withNavigationErrorHandler,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { ExhibitStore } from './exhibit/exhibit.store';

/** Root exhibit-loading, dependency-injection, and router configuration for the kiosk application. */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(ExhibitStore).loadExhibits()),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withNavigationErrorHandler((error) => {
        inject(ErrorHandler).handleError(error);

        const homePath = inject(Router).parseUrl('/');
        return new RedirectCommand(homePath);
      }),
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
  ],
};
