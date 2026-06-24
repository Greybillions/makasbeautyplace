import Image from 'next/image';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

const socials = [
  {
    label: 'Instagram',
    handle: '@makas_beautyplace',
    description:
      'See my latest styles, transformations, and behind-the-scenes.',
    href: 'https://www.instagram.com/makas_beautyplace',
    icon: <FaInstagram size={18} />,
    cta: 'Follow on Instagram',
    accent: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    textAccent: 'text-[#DD2A7B]',
    bgAccent: 'bg-[#FFF0F7]',
  },
  {
    label: 'TikTok',
    handle: '@makas_beautyplace',
    description: 'Watch quick tutorials, style reveals, and hair tips.',
    href: 'https://www.tiktok.com/@makas_beautyplace?_r=1&_t=ZN-97UBWiPWsmE',
    icon: <FaTiktok size={18} />,
    cta: 'Follow on TikTok',
    accent: 'bg-[#111827]',
    textAccent: 'text-[#111827]',
    bgAccent: 'bg-[#F3F4F6]',
  },
];

export default function HairPage() {
  return (
    <main className='min-h-screen bg-[#F9FAFB] px-4 py-16 md:px-8'>
      <div className='mx-auto max-w-lg'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='mx-auto mb-5 h-20 w-20 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5'>
            <Image
              src='/amy.jpeg'
              alt='Amy'
              width={80}
              height={80}
              className='h-full w-full object-cover'
            />
          </div>
          <h1 className='text-[1.6rem] font-bold tracking-tight text-[#111827]'>
            Maka&apos;s Beauty Place
          </h1>
          <p className='mt-1.5 text-sm font-medium text-[#6B7280]'>
            Luxury braids · Wig installs · Protective styling
          </p>

          {/* Badges row */}
          <div className='mt-4 flex items-center justify-center gap-2 flex-wrap'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-medium text-[#6B7280] shadow-sm'>
              <span className='h-2 w-2 rounded-full bg-green-400' />
              Taking bookings · DM to schedule
            </div>
            <div className='inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-medium text-[#6B7280] shadow-sm'>
              🇨🇦 Canada
            </div>
          </div>
        </div>

        {/* Social cards */}
        <div className='space-y-3'>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#D1D5DB]'
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${s.accent} shadow-sm`}
              >
                {s.icon}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-semibold text-[#111827]'>
                    {s.label}
                  </span>
                  <span
                    className={`rounded-full ${s.bgAccent} ${s.textAccent} px-2 py-0.5 text-xs font-semibold`}
                  >
                    {s.handle}
                  </span>
                </div>
                <p className='mt-0.5 text-sm text-[#6B7280] leading-relaxed'>
                  {s.description}
                </p>
              </div>
              <span className='text-[#9CA3AF] transition-transform duration-200 group-hover:translate-x-1'>
                →
              </span>
            </a>
          ))}
        </div>

        {/* Book CTA */}
        <div className='mt-6 rounded-2xl border border-[#E5E7EB] bg-[#111827] p-6 text-center shadow-sm'>
          <p className='text-sm font-semibold text-white'>
            Ready to book a hair appointment?
          </p>
          <p className='mt-1 text-xs text-[#9CA3AF] leading-relaxed'>
            Slide into my DMs on Instagram or TikTok and let&apos;s get you
            scheduled.
          </p>
          <div className='mt-4 flex items-center justify-center gap-3 flex-wrap'>
            <a
              href='https://www.instagram.com/makas_beautyplace'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90'
            >
              <FaInstagram size={13} />
              DM on Instagram
            </a>
            <a
              href='https://www.tiktok.com/@makas_beautyplace?_r=1&_t=ZN-97UBWiPWsmE'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] shadow-sm transition-opacity hover:opacity-90'
            >
              <FaTiktok size={13} />
              DM on TikTok
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center space-y-1'>
          <p className='text-xs text-[#9CA3AF]'>
            © {new Date().getFullYear()} Maka&apos;s Beauty Place
          </p>
        </div>
      </div>
    </main>
  );
}
