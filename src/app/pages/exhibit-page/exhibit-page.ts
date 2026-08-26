import { Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AboutModal } from '../../components/about-modal/about-modal';
import { ExhibitStore } from '../../services/exhibit-store';

@Component({
  selector: 'app-exhibit-page',
  imports: [],
  templateUrl: './exhibit-page.html',
  styleUrl: './exhibit-page.scss',
})
export default class ExhibitPage {
  readonly activeRoute = inject(ActivatedRoute);
  readonly exhibitStore = inject(ExhibitStore);
  private readonly dialog = inject(MatDialog);

  protected readonly exhibits = this.exhibitStore.exhibits;
  protected readonly exhibit = computed(() => {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (!id || this.exhibitStore.exhibits.isLoading()) {
      return undefined;
    }

    return this.exhibitStore.exhibits.value().find((ex) => ex.id === id);
  });

  openAbout(): void {
    const exhibit = this.exhibit();
    if (exhibit) {
      this.dialog.open(AboutModal, {
        data: exhibit,
      });
    }
  }
}
