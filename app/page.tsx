import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import React from 'react';

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <footer className='py-6 text-center'>
        <p className='text-lg text-white'>
          Designed & Built by{' '}
          <a
            href='https://madebygrey.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-white underline underline-offset-2 hover:text-[#374151] transition-colors'
          >
            Grey
          </a>
        </p>
      </footer>
    </>
  );
};

export default page;
