interface LoadingOverlayProps {
  loading: string | null;
}

export default function LoadingOverlay({ loading }: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='flex flex-col items-center gap-6'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white' />
        <div className='text-center text-white'>
          <h3 className='text-xl font-semibold'>Redirecting...</h3>
          <p className='mt-2 text-sm text-white/70'>
            Please wait while we connect you to {loading}.
          </p>
        </div>
      </div>
    </div>
  );
}
