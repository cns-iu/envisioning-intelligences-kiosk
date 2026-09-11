import { render, screen } from '@testing-library/angular';
import { MarkdownService } from 'ngx-markdown';
import { CONTENT_CYCLE_TIME_MS, Screensaver } from './screensaver';

describe('Screensaver', () => {
  async function setup(inputs: Record<string, unknown> = {}) {
    return render(Screensaver, {
      inputs: { active: false, ...inputs },
      providers: [MarkdownService],
    });
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders the default prompt and reflects its inactive state on the host', async () => {
    const { fixture } = await setup();
    const host = fixture.nativeElement as HTMLElement;

    expect(
      screen.getByText('What does intelligence look like when exhibited by humans or machines, plants or animals?'),
    ).toBeInTheDocument();
    expect(host).toHaveClass('app-screensaver');
    expect(host).not.toHaveClass('app-screensaver--active');
  });

  it('reflects its active state on the host', async () => {
    const { fixture } = await setup({ active: true });

    expect(fixture.nativeElement).toHaveClass('app-screensaver--active');
  });

  it('accepts a single custom prompt', async () => {
    await setup({ content: 'Touch to continue' });

    expect(screen.getByText('Touch to continue')).toBeInTheDocument();
  });

  it('cycles through prompts while active', async () => {
    const setIntervalMock = vi
      .spyOn(globalThis, 'setInterval')
      .mockImplementation(() => 1 as unknown as ReturnType<typeof setInterval>);
    const { fixture } = await setup({ active: true, content: ['First prompt', 'Second prompt'] });

    expect(setIntervalMock).toHaveBeenCalledWith(expect.any(Function), CONTENT_CYCLE_TIME_MS);
    expect(screen.getByText('First prompt')).toBeInTheDocument();

    const cycleContent = setIntervalMock.mock.calls.find(([, delay]) => delay === CONTENT_CYCLE_TIME_MS)?.[0];
    if (typeof cycleContent !== 'function') {
      throw new Error('Expected screensaver rotation to schedule a callback.');
    }
    cycleContent();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.getByText('Second prompt')).toBeInTheDocument();
  });

  it('does not cycle through prompts while inactive', async () => {
    const setIntervalMock = vi.spyOn(globalThis, 'setInterval');
    await setup({ content: ['First prompt', 'Second prompt'] });

    expect(setIntervalMock).not.toHaveBeenCalledWith(expect.any(Function), CONTENT_CYCLE_TIME_MS);
    expect(screen.getByText('First prompt')).toBeInTheDocument();
    expect(screen.queryByText('Second prompt')).not.toBeInTheDocument();
  });
});
