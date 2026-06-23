import { CreditCard } from 'lucide-react';

interface PaymentMethodsProps {
  loading: string | null;
  onStripe: () => void;
  onPaystack: () => void;
}

export default function PaymentMethods({
  loading,
  onStripe,
  onPaystack,
}: PaymentMethodsProps) {
  return (
    <div className='mt-12 grid gap-6 md:grid-cols-2'>
      <button
        disabled={!!loading}
        onClick={onStripe}
        className='group rounded-3xl border border-[#E8E0D5] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#B26B3B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60'
      >
        <CreditCard size={32} className='text-[#B26B3B]' />
        <h3 className='mt-6 text-2xl font-semibold text-[#1C1008]'>Stripe</h3>
        <p className='mt-3 text-[#5E534A]'>
          Pay securely with Visa, Mastercard, Apple Pay, and Google Pay.
        </p>
        <div className='mt-6 text-sm font-medium text-[#B26B3B]'>
          {loading === 'Stripe' ? 'Redirecting...' : 'Continue with Stripe →'}
        </div>
      </button>
      <button
        disabled={!!loading}
        onClick={onPaystack}
        className='group rounded-3xl border border-[#E8E0D5] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#B26B3B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60'
      >
        <CreditCard size={32} className='text-[#B26B3B]' />

        <h3 className='mt-6 text-2xl font-semibold text-[#1C1008]'>Paystack</h3>

        <p className='mt-3 text-[#5E534A]'>
          Pay using cards, transfer, USSD, and mobile money.
        </p>

        <div className='mt-6 text-sm font-medium text-[#B26B3B]'>
          {loading === 'Paystack'
            ? 'Redirecting...'
            : 'Continue with Paystack →'}
        </div>
      </button>
    </div>
  );
}
