import { booleanAttribute, Component, input, output } from '@angular/core';
import { createThumbnailUrl } from '../../shared/thumbnail-url';

/**
 * An embedded video player with a thumbnail and optional looping.
 */
@Component({
  selector: 'app-embedded-video',
  imports: [],
  templateUrl: './embedded-video.html',
  styleUrl: './embedded-video.scss',
})
export class EmbeddedVideo {
  /** URL of the video to embed. */
  readonly videoUrl = input.required<string>();

  /** The URL of the video's thumbnail. */
  readonly thumbnailUrl = input.required({ transform: (url: string) => createThumbnailUrl(url, 720) });

  /** Whether the video should loop. */
  readonly loop = input(false, { transform: booleanAttribute });

  /** Emits when an error occurs while loading the video. */
  readonly loadingError = output();
}
