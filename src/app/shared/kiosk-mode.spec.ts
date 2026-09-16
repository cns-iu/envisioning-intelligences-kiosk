import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IS_KIOSK_MODE } from './kiosk-mode';

describe('IS_KIOSK_MODE', () => {
  function setup(initialQueryParams: Record<string, string> = {}) {
    const queryParamMap = new BehaviorSubject<ParamMap>(convertToParamMap(initialQueryParams));
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: { queryParamMap } }],
    });

    return {
      isKioskMode: TestBed.inject(IS_KIOSK_MODE),
      setQueryParams: (params: Record<string, string>) => queryParamMap.next(convertToParamMap(params)),
    };
  }

  it('is disabled when the kiosk mode parameter is absent', () => {
    const { isKioskMode } = setup();

    expect(isKioskMode()).toBe(false);
  });

  it.each(['', 'true'])('is enabled by a %j kiosk mode parameter', (value) => {
    const { isKioskMode } = setup({ kioskMode: value });

    expect(isKioskMode()).toBe(true);
  });

  it('is disabled when the kiosk mode parameter is explicitly false', () => {
    const { isKioskMode } = setup({ kioskMode: 'false' });

    expect(isKioskMode()).toBe(false);
  });

  it('responds when a later navigation enables kiosk mode', () => {
    const { isKioskMode, setQueryParams } = setup();

    setQueryParams({ kioskMode: 'true' });

    expect(isKioskMode()).toBe(true);
  });

  it('remains enabled after later navigation removes the parameter', () => {
    const { isKioskMode, setQueryParams } = setup({ kioskMode: 'true' });

    setQueryParams({});

    expect(isKioskMode()).toBe(true);
  });
});
