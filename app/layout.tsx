import "./globals.css";

import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "ZL/utils";

export const metadata = {
  title: "Next Book",
  description: "What are you reading?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
