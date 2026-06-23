'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Slot = {
  start: string;
};

export default function TravelScheduler() {
  const [slots, setSlots] = useState<Record<string, Slot[]>>({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadSlots() {
      const res = await fetch('/api/cal/slots');
      const data = await res.json();
      setSlots(data.data);
      const firstDate = Object.keys(data.data)[0];
      if (firstDate) setSelectedDate(firstDate);
    }
    loadSlots();
  }, []);

  const continueToPayment = () => {
    if (!selectedSlot) return;
    localStorage.setItem(
      'travel-booking',
      JSON.stringify({ start: selectedSlot }),
    );
    router.push('/book/travel/payment');
  };

  const dates = Object.keys(slots);
  const selectedTimes = slots[selectedDate] || [];

  return (
    <div className='min-h-screen bg-[#F9FAFB] flex items-start justify-center px-4 py-10'>
      <div className='w-full max-w-5xl'>
        {/* Header */}
        <div className='mb-8'>
          <span className='text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B35]'>
            Travel Consultation
          </span>
          <h1 className='mt-2 text-3xl font-bold text-[#111827]'>
            Pick a date &amp; time
          </h1>
          <p className='mt-1.5 text-sm text-[#6B7280]'>
            Select an available slot for your 30-minute relocation support
            session.
          </p>
        </div>

        {/* Main card */}
        <div className='rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden'>
          {/* Top bar */}
          <div className='flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center'>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <polyline points='12 6 12 12 16 14' />
                </svg>
              </div>
              <span className='text-sm font-semibold text-[#111827]'>
                30 Minutes
              </span>
            </div>
            <span className='rounded-full bg-[#FFF3EE] px-3 py-1 text-xs font-semibold text-[#FF6B35]'>
              $25 CAD
            </span>
          </div>

          <div className='grid lg:grid-cols-[1fr_auto_1fr]'>
            {/* Dates */}
            <div className='p-6'>
              <p className='mb-5 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]'>
                Available Dates
              </p>
              <div className='grid grid-cols-4 gap-2 sm:grid-cols-5'>
                {dates.map((date) => {
                  const d = new Date(date);
                  const isSelected = selectedDate === date;
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot('');
                      }}
                      className={`aspect-square rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-0.5
                        ${
                          isSelected
                            ? 'border-[#111827] bg-[#111827] text-white shadow-md'
                            : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] hover:border-[#D1D5DB] hover:bg-white'
                        }`}
                    >
                      <span
                        className={`text-[9px] uppercase tracking-wider font-medium ${isSelected ? 'text-white/60' : 'text-[#9CA3AF]'}`}
                      >
                        {d.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className='text-xl font-bold leading-none'>
                        {d.getDate()}
                      </span>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-medium ${isSelected ? 'text-white/60' : 'text-[#9CA3AF]'}`}
                      >
                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className='hidden lg:block w-px bg-[#E5E7EB] my-6' />
            <div className='block lg:hidden h-px bg-[#E5E7EB] mx-6' />

            {/* Times */}
            <div className='p-6 flex flex-col'>
              <div className='mb-5 flex items-center justify-between'>
                <p className='text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]'>
                  Available Times
                </p>
                {selectedDate && (
                  <span className='text-xs font-medium text-[#6B7280]'>
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>

              {selectedTimes.length > 0 ? (
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
                  {selectedTimes.map((slot) => {
                    const isSelected = selectedSlot === slot.start;
                    return (
                      <button
                        key={slot.start}
                        onClick={() => setSelectedSlot(slot.start)}
                        className={`rounded-xl border py-3 px-2 text-center text-sm font-medium transition-all duration-200
                          ${
                            isSelected
                              ? 'border-[#FF6B35] bg-[#FF6B35] text-white shadow-sm'
                              : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#FF6B35]/40 hover:bg-[#FFF3EE]'
                          }`}
                      >
                        {new Date(slot.start).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className='flex flex-1 items-center justify-center rounded-xl bg-[#F9FAFB] border border-dashed border-[#E5E7EB] py-12'>
                  <p className='text-sm text-[#9CA3AF]'>
                    Select a date to see available times
                  </p>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={continueToPayment}
                disabled={!selectedSlot}
                className='mt-6 w-full rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-40'
              >
                {selectedSlot
                  ? `Continue → ${new Date(selectedSlot).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
                  : 'Select a time to continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
