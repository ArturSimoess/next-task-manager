import './globals.css';
import { Providers } from '@/lib/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-slate-100 text-slate-800 min-h-screen'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}