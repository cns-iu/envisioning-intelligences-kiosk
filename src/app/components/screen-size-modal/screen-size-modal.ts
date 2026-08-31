import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-screen-size-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './screen-size-modal.html',
  styleUrl: './screen-size-modal.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-screen-size-modal' },
})
export class ScreenSizeModal {}
