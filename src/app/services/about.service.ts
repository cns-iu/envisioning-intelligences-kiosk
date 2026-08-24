import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { load } from 'js-yaml';
import { map } from 'rxjs';
import { AboutModal } from '../components/about-modal/about-modal';
import { AboutSchema } from '../models/about';

@Service()
export class AboutService {
  /** Material dialog reference */
  private readonly dialog = inject(MatDialog);
  /** Http client reference */
  private readonly http = inject(HttpClient);

  /**
   * Opens the about modal dialog with the content of the given YAML file.
   * The YAML file is parsed and validated against the {@link AboutSchema}.
   * If the file is invalid, an error will be thrown and the dialog will not open.
   * @param url The URL of the YAML file to open.
   */
  openDialog(url: string) {
    this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map((data) => load(data, { filename: url })),
        map((data) => AboutSchema.parse(data)),
      )
      .subscribe((data) => {
        this.dialog.open(AboutModal, { data });
      });
  }
}
