import { Clock3 } from 'lucide-react';
import { ReactNode } from 'react';

interface BookingInfoCardProps {
  icon: ReactNode;
  business: string;
  title: string;
  duration: string;
  price: string;
  children: ReactNode;
}

export default function BookingInfoCard({
  icon,
  business,
  title,
  duration,
  price,
  children,
}: BookingInfoCardProps) {
  return (
    <aside className='fade-up rounded-3xl border border-[#E8E0D5] bg-white p-8 shadow-sm'>
      <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1C1008] text-white'>
        {icon}
      </div>
      <p className='text-sm font-medium uppercase tracking-[0.2em] text-[#B26B3B]'>
        {business}
      </p>
      <h1 className='mt-4 text-4xl font-bold text-[#1C1008]'>{title}</h1>
      <div className='mt-6 flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 rounded-full bg-[#FAF7F2] px-4 py-2 text-sm text-[#1C1008]'>
          <Clock3 size={16} />
          {duration}
        </div>

        <div className='rounded-full bg-[#FAF7F2] px-4 py-2 text-sm font-medium text-[#1C1008]'>
          {price}
        </div>
      </div>
      {children}
    </aside>
  );
}
