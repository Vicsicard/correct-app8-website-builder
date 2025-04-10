import { getAllVideos } from '@/lib/getVideos';
import VideoCard from '@/components/VideoCard';

export default async function VideosPage() {
  const videos = await getAllVideos();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Videos</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
