import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { render } from '@testing-library/angular';
import { ExhibitStore } from '../../services/exhibit-store';
import ExhibitPage from './exhibit-page';

describe('ExhibitPage', () => {
  it('renders the exhibit page', async () => {
    const result = render(ExhibitPage, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        {
          provide: ExhibitStore,
          useValue: {
            exhibits: {
              hasValue: () => true,
              isLoading: () => false,
              value: () => [],
            },
          },
        },
        { provide: MatDialog, useValue: { open: vi.fn() } },
      ],
    });

    await expect(result).resolves.toBeDefined();
  });
});
