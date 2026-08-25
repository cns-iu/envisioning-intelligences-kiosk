import { render } from '@testing-library/angular';
import LandingPage from './landing-page';

describe('LandingPage', () => {
  it('renders the landing page', async () => {
    const result = render(LandingPage);
    await expect(result).resolves.toBeDefined();
  });
});
