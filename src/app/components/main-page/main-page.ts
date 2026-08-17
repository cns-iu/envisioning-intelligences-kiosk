import { Component } from '@angular/core';
import { KioskCard } from '../kiosk-card/kiosk-card';

@Component({
  selector: 'app-main-page',
  imports: [KioskCard],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
