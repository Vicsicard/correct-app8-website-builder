import { getVideoById, getAllVideoIds } from '@/lib/getVideos';
import { notFound } from 'next/navigation';

// Generate static params for all videos
export async function generateStaticParams() {
  const ids = await getAllVideoIds();
  return ids.map((id) => ({
    id,
  }));
}

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const video = await getVideoById(params.id);

  if (!video) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose lg:prose-xl">
      <h1>{video.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <time>{new Date(video.date).toLocaleDateString()}</time>
      </div>
      <div className="aspect-video w-full mb-8">
        <iframe
          src={video.embed_url}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: video.body }} />
      {video.tags && video.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {video.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
