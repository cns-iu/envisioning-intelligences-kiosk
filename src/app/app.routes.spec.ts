import ExhibitPage from './pages/exhibit-page/exhibit-page';
import { appRoutes } from './app.routes';

describe('appRoutes', () => {
  it('loads the exhibit page component for exhibit routes', async () => {
    const exhibitRoute = appRoutes.find((route) => route.path === 'exhibit/:id');
    if (!exhibitRoute?.loadComponent) {
      throw new Error('The exhibit route must define a component loader');
    }

    expect(await exhibitRoute.loadComponent()).toEqual(expect.objectContaining({ default: ExhibitPage }));
  });
});
