import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '../lib/getVideos';

interface VideoCardProps {
  video: Video;
}

function getVideoType(url: string): 'youtube' | 'self-hosted' {
  return url.includes('youtube.com') || url.includes('youtu.be') 
    ? 'youtube' 
    : 'self-hosted';
}

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.includes('youtu.be')
    ? url.split('/').pop()
    : new URL(url).searchParams.get('v');
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoType = getVideoType(video.video_url);
  const embedUrl = videoType === 'youtube' ? getYouTubeEmbedUrl(video.video_url) : video.video_url;

  return (
    <Link href={`/video/${video.id}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
        <div className="relative aspect-video">
          {videoType === 'youtube' ? (
            <iframe
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              src={embedUrl}
              controls
              preload="metadata"
              poster={video.thumbnail_url}
              className="absolute inset-0 w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
            {video.title}
          </h3>
          
          {video.description && (
            <p className="text-gray-600 mb-4 line-clamp-2">
              {video.description}
            </p>
          )}

          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <time className="text-sm text-gray-500">
              {new Date(video.published_at || video.created_at).toLocaleDateString()}
            </time>
            {video.views && (
              <span className="text-sm text-gray-500">
                {video.views.toLocaleString()} views
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
