import Link from 'next/link';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: FaLinkedin,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: FaInstagram,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourusername',
      icon: FaFacebook,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: FaTwitter,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-gray-400">
              Building the future of web development with modern technologies and best practices.
              Sharing knowledge and experiences through blogs and videos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-400 hover:text-white transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links and Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title={link.name}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p> {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
