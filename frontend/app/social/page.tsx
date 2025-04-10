import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaHeart, FaShare } from 'react-icons/fa';
import Image from 'next/image';

interface SocialPost {
  id: string;
  platform: 'linkedin' | 'facebook' | 'twitter' | 'instagram';
  content: string;
  date: string;
  likes: number;
  shares: number;
  image?: string;
}

// Placeholder data
const socialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'linkedin',
    content: 'Excited to share my latest thoughts on web development and the future of technology! #webdev #tech',
    date: '2025-04-10',
    likes: 156,
    shares: 23,
  },
  {
    id: '2',
    platform: 'instagram',
    content: 'Behind the scenes at our latest tech meetup! 📱 #techmeetup #coding #developer',
    date: '2025-04-10',
    likes: 324,
    shares: 15,
    image: 'https://placehold.co/600x600/darkgray/white?text=Instagram+Post',
  },
  {
    id: '3',
    platform: 'facebook',
    content: 'Just launched a new feature for our platform. Check it out and let me know what you think! 🚀',
    date: '2025-04-09',
    likes: 89,
    shares: 12,
  },
  {
    id: '4',
    platform: 'twitter',
    content: 'The key to great software? Understanding your users. Always build with empathy first. 💡 #softwareengineering',
    date: '2025-04-08',
    likes: 234,
    shares: 45,
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedin className="text-[#0077b5] text-xl" />;
    case 'facebook':
      return <FaFacebook className="text-[#1877f2] text-xl" />;
    case 'twitter':
      return <FaTwitter className="text-[#1da1f2] text-xl" />;
    case 'instagram':
      return <FaInstagram className="text-[#e4405f] text-xl" />;
    default:
      return null;
  }
};

export default function SocialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Social Media Updates</h1>
      <div className="space-y-6">
        {socialPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <PlatformIcon platform={post.platform} />
              <span className="text-gray-600 capitalize">{post.platform}</span>
              <span className="text-gray-400 text-sm">•</span>
              <time className="text-gray-600 text-sm">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </div>
            {post.image && (
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt="Social media post image"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-gray-800 mb-4">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaHeart className="text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaShare className="text-gray-500" />
                <span>{post.shares}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
