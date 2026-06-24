import Link from 'next/link';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const socials = [
  {
    label: 'Instagram',
    handle: '@thequeen__amy',
    description:
      'See my latest styles, transformations, and behind-the-scenes.',
    href: 'https://www.instagram.com/thequeen__amy',
    icon: <FaInstagram size={18} />,
    cta: 'Follow',
    accent: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
  {
    label: 'YouTube',
    handle: '@thequeenamyy',
    description: 'Full-length videos on hair care, installs, and my journey.',
    href: 'https://youtube.com/@thequeenamyy',
    icon: <FaYoutube size={18} />,
    cta: 'Watch',
    accent: 'bg-[#FF0000]',
  },
];

export default function SocialsCard() {
  return (
    <div className='rounded-3xl border border-neutral-200 bg-white p-6'>
      <div className='mb-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500'>
          Socials
        </p>

        <h3 className='mt-2 text-2xl font-semibold text-neutral-900'>
          Follow My Journey
        </h3>

        <p className='mt-2 text-sm text-neutral-600'>
          Connect with me on Instagram and YouTube for updates, tutorials, and
          real-life relocation insights.
        </p>
      </div>

      <div className='space-y-4'>
        {socials.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-start gap-4 rounded-2xl border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:bg-neutral-50'
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${social.accent}`}
            >
              {social.icon}
            </div>

            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='font-medium text-neutral-900'>
                    {social.label}
                  </h4>

                  <p className='text-sm text-neutral-500'>{social.handle}</p>
                </div>

                <span className='text-sm font-medium text-neutral-900 transition-transform group-hover:translate-x-1'>
                  {social.cta} →
                </span>
              </div>

              <p className='mt-2 text-sm text-neutral-600'>
                {social.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
