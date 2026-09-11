import { Subject } from 'rxjs';
import { idleAfter } from './idle-after';

const IDLE_TIME_MS = 1000;

describe('idleAfter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits an initial active state followed by an idle state after the timeout', () => {
    const activity = new Subject<void>();
    const states: boolean[] = [];
    activity.pipe(idleAfter(IDLE_TIME_MS)).subscribe((state) => states.push(state));

    expect(states).toEqual([false]);

    vi.advanceTimersByTime(IDLE_TIME_MS - 1);
    expect(states).toEqual([false]);

    vi.advanceTimersByTime(1);
    expect(states).toEqual([false, true]);
  });

  it('restarts the idle timeout whenever activity occurs', () => {
    const activity = new Subject<void>();
    const states: boolean[] = [];
    activity.pipe(idleAfter(IDLE_TIME_MS)).subscribe((state) => states.push(state));

    vi.advanceTimersByTime(IDLE_TIME_MS - 1);
    activity.next();
    vi.advanceTimersByTime(IDLE_TIME_MS - 1);
    expect(states).toEqual([false]);

    vi.advanceTimersByTime(1);
    expect(states).toEqual([false, true]);
  });

  it('returns to the active state when activity resumes after idling', () => {
    const activity = new Subject<void>();
    const states: boolean[] = [];
    activity.pipe(idleAfter(IDLE_TIME_MS)).subscribe((state) => states.push(state));

    vi.advanceTimersByTime(IDLE_TIME_MS);
    activity.next();

    expect(states).toEqual([false, true, false]);
  });
});
