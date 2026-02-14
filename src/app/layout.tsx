import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Jared Serfozo | Digital Media Consultant',
  description:
    'Portfolio of Jared Serfozo — Digital Media Consultant specializing in video production, live streaming, and AI-driven media solutions.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Jared Serfozo | Digital Media Consultant',
    description:
      'Portfolio of Jared Serfozo — Digital Media Consultant specializing in video production, live streaming, and AI-driven media solutions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
