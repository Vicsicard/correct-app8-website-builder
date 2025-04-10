'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Videos', href: '/videos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Your Brand
          </Link>
          
          <ul className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = 
                item.href === '/' 
                  ? pathname === '/' 
                  : pathname?.startsWith(item.href);
                  
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    } transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
