import type { Metadata } from "next";
import { instrumentSerif, merriweather, nunitoSans } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Next Book",
  description: "Your personal library assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} ${merriweather.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
              <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl font-bold">Next Book</span>
                </div>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 pb-20 sm:pb-0">{children}</main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
