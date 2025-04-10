import { Metadata } from 'next';
import { getVideoById, getAllVideoIds } from '../../../lib/getVideos';
import { notFound } from 'next/navigation';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const videoIds = await getAllVideoIds();
  return videoIds.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const video = await getVideoById(params.id);

  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  return {
    title: video.title,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      type: 'video.other',
      images: video.thumbnail_url ? [{ url: video.thumbnail_url }] : [],
    },
  };
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

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideoById(params.id);

  if (!video) {
    notFound();
  }

  const videoType = getVideoType(video.video_url);
  const embedUrl = videoType === 'youtube' ? getYouTubeEmbedUrl(video.video_url) : video.video_url;

  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
          {video.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">{video.description}</p>
          )}
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
            {videoType === 'youtube' ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={embedUrl}
                controls
                preload="metadata"
                poster={video.thumbnail_url}
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

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

          {video.published_at && (
            <time className="block mt-6 text-sm text-gray-500">
              Published on {new Date(video.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </section>
    </main>
  );
}
