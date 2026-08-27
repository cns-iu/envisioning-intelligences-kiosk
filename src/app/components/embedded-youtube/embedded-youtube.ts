import { Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

/**
 *  Embeds a YouTube video player for the specified video ID.
 */
@Component({
  selector: 'app-embedded-youtube',
  imports: [YouTubePlayer],
  templateUrl: './embedded-youtube.html',
  styleUrl: './embedded-youtube.scss',
})
export class EmbeddedYoutube {
  /** ID of the YouTube video to embed. */
  readonly videoId = input.required<string>();
}
