import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { App } from './app';
import { appConfig } from './app.config';

@Component({ template: '' })
class RouteStub {}

describe('App', () => {
  it('renders', async () => {
    const result = render(App, { providers: appConfig.providers });
    await expect(result).resolves.toBeDefined();
  });

  it('shows the resolved title only on exhibit routes', async () => {
    const { navigate } = await render(App, {
      routes: [
        { path: '', component: RouteStub },
        { path: 'exhibit/:id', component: RouteStub, title: 'Collective Intelligence' },
      ],
    });

    await navigate('/exhibit/collective-intelligence');
    expect(screen.getByText('Collective Intelligence')).toBeInTheDocument();

    await navigate('/');
    expect(screen.queryByText('Collective Intelligence')).not.toBeInTheDocument();
  });
});
