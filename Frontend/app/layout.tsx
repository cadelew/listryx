import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Listryx - Property Management',
  description: 'Property management platform for real estate professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="antialiased">{children}</body>
    </html>
  );
}

