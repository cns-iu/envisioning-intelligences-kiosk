import { Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-embedded-youtube',
  imports: [YouTubePlayer],
  templateUrl: './embedded-youtube.html',
  styleUrl: './embedded-youtube.scss',
})
export class EmbeddedYoutube {
  readonly videoId = input.required<string>();
}
