import { Component, input } from '@angular/core';

@Component({
  selector: 'app-work-page',
  imports: [],
  templateUrl: './work-page.html',
  styleUrl: './work-page.scss',
})
export class WorkPage {
  readonly id = input<string>();
}
