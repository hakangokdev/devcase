import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anima Project - Converted to Next.js',
  description: 'A Next.js project converted from Anima using the Shadcn UI library',
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