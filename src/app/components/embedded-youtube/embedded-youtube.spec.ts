import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { YouTubePlayer } from '@angular/youtube-player';
import { EmbeddedYoutube } from './embedded-youtube';

describe('EmbeddedYoutube', () => {
  it('passes the video ID to the YouTube player', async () => {
    const { fixture } = await render(EmbeddedYoutube, {
      inputs: { videoId: 'dQw4w9WgXcQ' },
    });

    const player = fixture.debugElement.query(By.directive(YouTubePlayer));

    expect(player).toBeTruthy();
    expect(player.componentInstance.videoId).toBe('dQw4w9WgXcQ');
  });
});
