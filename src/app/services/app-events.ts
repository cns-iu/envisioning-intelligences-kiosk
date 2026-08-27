import { assertInInjectionContext, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Subject } from 'rxjs';

/** Event envelope emitted through the application-level event bus. */
interface AppEvent {
  /** Name used by subscribers to select the event. */
  type: string;

  /** Optional value forwarded to matching subscribers. */
  payload?: unknown;
}

/** Coordinates transient UI events between the application shell and active routed page. */
@Service()
export class AppEvents {
  /** Writable event source kept private from consumers. */
  readonly #events = new Subject<AppEvent>();

  /** Read-only stream of all dispatched application events. */
  readonly events = this.#events.asObservable();

  /**
   * Dispatches an application event synchronously.
   *
   * @param type Name used to identify the event.
   * @param payload Optional value delivered to matching subscribers.
   */
  dispatch(type: string, payload?: unknown): void {
    this.#events.next({ type, payload });
  }

  /**
   * Registers an injection-context-bound handler for one event type.
   *
   * The subscription is disposed automatically with the current injection
   * context. The returned callback permits earlier manual disposal.
   *
   * @param type Event type to observe.
   * @param handler Callback invoked with the matching event payload.
   * @returns A callback that unsubscribes the handler.
   * @throws {RuntimeError} When called outside an Angular injection context.
   */
  on(type: string, handler: (payload?: unknown) => void): () => void {
    assertInInjectionContext(this.on);

    const sub = this.#events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event.type === type),
      )
      .subscribe((event) => handler(event.payload));
    return () => sub.unsubscribe();
  }
}
