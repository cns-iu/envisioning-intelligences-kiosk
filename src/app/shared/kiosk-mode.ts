import { booleanAttribute, inject, InjectionToken, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take } from 'rxjs';

/**
 * Indicates whether kiosk mode has been enabled through the `kioskMode` query parameter.
 *
 * The signal starts as `false` and becomes `true` the first time the parameter has a
 * truthy boolean-attribute value. Once enabled, kiosk mode remains active for the
 * lifetime of the application, even when later navigation removes the parameter.
 */
export const IS_KIOSK_MODE = new InjectionToken<Signal<boolean>>('IS_KIOSK_MODE', {
  providedIn: 'root',
  factory: () => {
    const activatedRoute = inject(ActivatedRoute);
    const isKioskMode$ = activatedRoute.queryParamMap.pipe(
      map((params) => booleanAttribute(params.get('kioskMode'))),
      filter((value) => value),
      take(1),
    );

    return toSignal(isKioskMode$, { initialValue: false });
  },
});
