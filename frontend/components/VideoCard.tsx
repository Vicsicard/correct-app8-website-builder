import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/lib/getVideos';

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export default function VideoCard({ video, priority = false }: VideoCardProps) {
  // Extract video ID from embed_url for thumbnail
  const videoId = video.embed_url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 'https://placehold.co/320x180/darkgray/white?text=Video';

  return (
    <Link href={`/videos/${video.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
            priority={priority}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{video.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{video.excerpt}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{new Date(video.date).toLocaleDateString()}</span>
          </div>
          {video.tags && video.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {video.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
