import Image from 'next/image';
import { getProfile } from '@/lib/getProfile';
import { getAllBlogPosts, BlogPost } from '@/lib/getBlogPost';
import { getAllVideos, Video } from '@/lib/getVideos';
import BlogCard from '@/components/BlogCard';
import VideoCard from '@/components/VideoCard';

export const dynamic = 'force-dynamic';

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

interface Profile {
  full_name: string;
  title: string;
  bio: string;
  avatar_url: string;
  tagline?: string;
  quote?: string;
  email?: string;
  social_links: SocialLinks;
}

const defaultProfile: Profile = {
  full_name: 'Your Name',
  title: 'Web Developer & Content Creator',
  bio: 'Building amazing web experiences and sharing knowledge through content.',
  avatar_url: '/placeholder-avatar.jpg',
  social_links: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com'
  }
};

export default async function HomePage() {
  let profile: Profile = defaultProfile;
  let blogs: BlogPost[] = [];
  let videos: Video[] = [];

  try {
    [blogs, videos] = await Promise.all([
      getAllBlogPosts().catch(() => [] as BlogPost[]),
      getAllVideos().catch(() => [] as Video[]),
    ]);

    const fetchedProfile = await getProfile().catch(() => null);
    if (fetchedProfile) {
      profile = {
        ...fetchedProfile,
        avatar_url: fetchedProfile.avatar_url || defaultProfile.avatar_url,
        social_links: fetchedProfile.social_links || defaultProfile.social_links
      };
    }
  } catch (error) {
    console.error('Error fetching content:', error);
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {profile.avatar_url && (
            <div className="mb-8 relative">
              <div className="w-40 h-40 md:w-48 md:h-48 mx-auto relative">
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  fill
                  className="rounded-full object-cover shadow-xl"
                  priority
                />
              </div>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {profile.full_name}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            {profile.title}
          </p>

          {profile.tagline && (
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {profile.tagline}
            </p>
          )}
        </div>
      </section>

      {/* About Me Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            {profile.bio.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Story Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Origin Story</h2>
          <p className="text-gray-600 leading-relaxed">
            From humble beginnings to where I am today, my journey has been shaped by passion, 
            perseverance, and a relentless pursuit of excellence. What started as a simple curiosity 
            evolved into a lifelong mission to create meaningful impact through technology and innovation.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Every challenge faced and every milestone achieved has contributed to a unique perspective 
            that I bring to my work. This isn't just a career path – it's a story of transformation, 
            learning, and growth.
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Blog Posts</h2>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} post={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Video Content</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No videos available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote Section */}
      {profile.quote && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-2xl md:text-3xl text-gray-700 text-center max-w-4xl mx-auto italic">
              "{profile.quote}"
            </blockquote>
          </div>
        </section>
      )}

      {/* Contact/CTA Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          {profile.email && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Have a question or want to work together? I'd love to hear from you.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Contact Me
              </a>
            </div>
          )}
          {profile.social_links && Object.keys(profile.social_links).length > 0 && (
            <div className="mt-8 flex justify-center gap-6">
              {profile.social_links.twitter && (
                <a
                  href={profile.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {profile.social_links.linkedin && (
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {profile.social_links.github && (
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
