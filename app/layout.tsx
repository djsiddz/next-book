import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Next Book',
  description: 'What are you reading?',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className="fixed h-screen w-screen bg-[#e2d8ce] font-sans">{children}</body>
    </html>
  );
}
