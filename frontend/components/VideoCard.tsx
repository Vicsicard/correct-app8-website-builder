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
  const videoType = getVideoType(video.url);
  const thumbnailUrl = video.thumbnail_url || 'https://via.placeholder.com/320x180.png?text=Video+Thumbnail';

  return (
    <Link href={`/video/${video.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{new Date(video.published_at).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{video.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
