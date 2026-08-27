import { Component } from '@angular/core';

/** Provides the shared layout container for one or more kiosk cards. */
@Component({
  selector: 'app-kiosk-card-container',
  imports: [],
  template: '<ng-content />',
  styleUrl: './kiosk-card-container.scss',
})
export class KioskCardContainer {}
