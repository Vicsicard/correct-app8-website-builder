'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Videos', href: '/videos' },
  { label: 'Social', href: '/social' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Your Brand
          </Link>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
