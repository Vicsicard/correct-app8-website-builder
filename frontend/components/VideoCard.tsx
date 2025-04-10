import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/lib/getVideos';

function getVideoType(url: string): 'youtube' | 'self-hosted' {
  return url.includes('youtube.com') || url.includes('youtu.be')
    ? 'youtube'
    : 'self-hosted';
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = video.thumbnail_url || 'https://placehold.co/320x180/darkgray/white?text=Video';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-200" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(video.published_at).toLocaleDateString()}
          </span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Watch Video
          </a>
        </div>
      </div>
    </div>
  );
}
