import { render } from '@testing-library/angular';
import { EmbeddedVideo } from './embedded-video';

describe('EmbeddedVideo', () => {
  async function setup(inputs: Record<string, unknown> = {}) {
    return render(EmbeddedVideo, {
      inputs: {
        videoUrl: 'assets/videos/example.mp4',
        thumbnailUrl: 'assets/images/example.webp',
        ...inputs,
      },
    });
  }

  it('renders the video and its generated thumbnail', async () => {
    const { container } = await setup();
    const video = container.querySelector('video');
    const source = container.querySelector('source');

    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('disablepictureinpicture');
    expect(video).toHaveAttribute('poster', 'assets/images/example-720.webp');
    expect(source).toHaveAttribute('type', 'video/mp4');
    expect(source).toHaveAttribute('src', 'assets/videos/example.mp4');
  });

  it('does not loop by default', async () => {
    const { container } = await setup();

    expect(container.querySelector('video')).not.toHaveAttribute('loop');
  });

  it('loops when the loop input is present', async () => {
    const { container } = await setup({ loop: '' });

    expect(container.querySelector('video')).toHaveAttribute('loop');
  });
});
