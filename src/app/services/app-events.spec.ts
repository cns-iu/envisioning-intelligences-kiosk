import { TestBed } from '@angular/core/testing';
import { AppEvents } from './app-events';

describe('AppEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AppEvents] });
  });

  it('dispatches event envelopes through the public stream', () => {
    const events = vi.fn();
    TestBed.inject(AppEvents).events.subscribe(events);

    TestBed.inject(AppEvents).dispatch('open-about', { source: 'header' });

    expect(events).toHaveBeenCalledWith({ type: 'open-about', payload: { source: 'header' } });
  });

  it('invokes handlers only for matching event types', () => {
    const handler = vi.fn();
    const events = TestBed.inject(AppEvents);
    TestBed.runInInjectionContext(() => events.on('open-about', handler));

    events.dispatch('unrelated', 'ignored');
    events.dispatch('open-about', 'accepted');

    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith('accepted');
  });

  it('allows a handler to unsubscribe early', () => {
    const handler = vi.fn();
    const events = TestBed.inject(AppEvents);
    const unsubscribe = TestBed.runInInjectionContext(() => events.on('open-about', handler));

    unsubscribe();
    events.dispatch('open-about');

    expect(handler).not.toHaveBeenCalled();
  });

  it('requires an Angular injection context when registering a handler', () => {
    const events = TestBed.inject(AppEvents);

    expect(() => events.on('open-about', vi.fn())).toThrow();
  });
});
