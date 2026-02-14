'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface VideoEmbedProps {
  provider: 'youtube' | 'wistia' | 'link';
  videoId: string;
  title: string;
}

export default function VideoEmbed({ provider, videoId, title }: VideoEmbedProps) {
  if (provider === 'youtube') {
    return (
      <LiteYouTubeEmbed id={videoId} title={title} poster="maxresdefault" />
    );
  }

  if (provider === 'wistia') {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={`https://fast.wistia.net/embed/iframe/${videoId}?autoPlay=true`}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video items-center justify-center rounded-lg bg-surface">
      <p className="text-text-secondary">No video available for this project.</p>
    </div>
  );
}
