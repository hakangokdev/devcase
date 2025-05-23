import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devcase Project',
  description: 'Devcase Project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full overflow-hidden">{children}</body>
    </html>
  );
} 