import './globals.css';

import React from 'react';

import { fontSans } from 'ZL/fonts';
import { cn } from 'ZL/utils';

export const metadata = {
  title: 'Next Book',
  description: 'What are you reading?',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  );
}
