'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { navbarAnimation } from './Navbaranimation';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Consultation', href: '#consultation' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    navbarAnimation(navRef.current, linkRefs.current, ctaRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className='mx-auto flex max-w-6xl items-center justify-between px-5 py-4'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <span className='w-7 h-7 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white text-xs font-black'>
            M
          </span>
          <span className='text-[15px] font-semibold text-gray-900 tracking-tight'>
            Maka&apos;s Beauty Place
          </span>
        </Link>

        {/* Desktop links */}
        <div className='hidden md:flex items-center gap-1'>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className='px-4 py-2 text-sm text-gray-500 font-medium rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-all duration-200'
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className='hidden md:flex items-center gap-3'>
          <Link
            ref={ctaRef}
            href='/book'
            className='inline-flex items-center gap-1.5 rounded-full bg-[#1C1008] px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md'
          >
            Book Now
            <span className='text-[#FF6B35]'>→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors'
          aria-label='Toggle menu'
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-1'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className='px-3 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors'
            >
              {link.label}
            </a>
          ))}
          <Link
            href='/book'
            onClick={() => setMenuOpen(false)}
            className='mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1C1008] px-5 py-3 text-sm font-semibold text-white'
          >
            Book Now <span className='text-[#FF6B35]'>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
