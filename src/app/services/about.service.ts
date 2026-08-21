import { Service } from '@angular/core';
import { parse } from 'yaml';
import { AboutModalData } from '../components/about-modal/about-modal';

@Service()
export class AboutService {
  async load(path: string): Promise<AboutModalData> {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.status} ${response.statusText}`);
    }

    return parse(await response.text()) as AboutModalData;
  }
}
