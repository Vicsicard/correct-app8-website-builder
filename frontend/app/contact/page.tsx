import { FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-8">
          I'd love to hear from you! Whether you have a question about my work,
          want to collaborate on a project, or just want to say hello, feel free
          to reach out through any of the channels below.
        </p>

        <div className="space-y-6">
          <a
            href="mailto:contact@example.com"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaEnvelope className="w-6 h-6 mr-3" />
            <div>
              <h2 className="font-semibold">Email</h2>
              <p className="text-gray-600">contact@example.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaLinkedin className="w-6 h-6 mr-3" />
            <div>
              <h2 className="font-semibold">LinkedIn</h2>
              <p className="text-gray-600">Connect with me professionally</p>
            </div>
          </a>

          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaTwitter className="w-6 h-6 mr-3" />
            <div>
              <h2 className="font-semibold">Twitter</h2>
              <p className="text-gray-600">Follow me for updates</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
