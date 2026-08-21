import { inject, Service } from '@angular/core';
import { parse } from 'yaml';
import { AboutModal, AboutModalData } from '../components/about-modal/about-modal';
import { MatDialog } from '@angular/material/dialog';

@Service()
export class AboutService {
  private readonly dialog = inject(MatDialog);

  async load(path: string): Promise<AboutModalData> {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
    }

    return parse(await response.text()) as AboutModalData;
  }

  async openFile(url: string): Promise<void> {
    const data = await this.load(url);
    this.dialog.open(AboutModal, { data });
  }
}
