import { render } from '@testing-library/angular';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  it('renders', async () => {
    const result = render(App, { providers: appConfig.providers });
    await expect(result).resolves.toBeDefined();
  });
});
