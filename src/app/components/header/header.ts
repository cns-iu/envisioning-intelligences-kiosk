import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatButtonModule, InlineSVGModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly title = input<string>();

  readonly aboutClicked = output();
}
