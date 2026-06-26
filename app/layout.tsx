import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `Nwamaka Madu`,
  description: `I'm Nwamaka, From visa tips to full trip planning, I share what I've learned from personal experience — so your journey is smoother than mine had to be.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={` h-full antialiased`}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
