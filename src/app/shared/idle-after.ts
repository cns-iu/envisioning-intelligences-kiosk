import { connect, debounceTime, distinctUntilChanged, map, merge, OperatorFunction, pipe, startWith } from 'rxjs';

/**
 * Maps an activity stream to whether it has been idle for the configured duration.
 *
 * The resulting stream emits `false` initially and after every activity event, then
 * emits `true` when no further activity occurs before the idle timeout elapses.
 *
 * @param idleTimeMs - Duration without activity required to enter the idle state.
 * @returns An RxJS operator that emits the current idle state.
 */
export function idleAfter(idleTimeMs: number): OperatorFunction<unknown, boolean> {
  return pipe(
    startWith(undefined),
    connect((activity$) =>
      merge(
        activity$.pipe(map(() => false)),
        activity$.pipe(
          debounceTime(idleTimeMs),
          map(() => true),
        ),
      ),
    ),
    distinctUntilChanged(),
  );
}
