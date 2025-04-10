import Image from 'next/image';
import { getProfile } from '../../src/lib/getProfile';

export default async function HomePage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {profile.avatar_url && (
            <div className="mb-8">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                width={200}
                height={200}
                className="rounded-full mx-auto shadow-lg"
                priority
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {profile.full_name}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {profile.tagline}
          </p>

          <blockquote className="text-2xl italic text-gray-700 max-w-2xl mx-auto border-l-4 border-gray-300 pl-4 mb-8">
            "{profile.quote}"
          </blockquote>
        </div>
      </div>
    </main>
  );
}
