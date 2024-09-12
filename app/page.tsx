"use client";

import Link from "next/link";

import FeatureCardGrid from "ZC/native/FeatureCardGrid";
import Nav from "ZC/native/Nav";
import { Button } from "ZC/ui/button";
import { marketingHomepageContent as marketingContent } from "ZL/content";

export default function Home() {
  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] p-10 [background-size:16px_16px]">
      <Nav />
      <main className="flex min-h-screen flex-col justify-center pt-8 md:items-center md:pt-0">
        <h1 className="mb-6 text-balance text-4xl md:text-6xl">{marketingContent.pageTitle}</h1>
        <p className="mb-12 text-balance text-lg md:text-xl">{marketingContent.pageSubtitle}</p>
        <div className="flex flex-col gap-4 md:flex-row md:justify-start">
          <Button asChild className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            <Link href="/signup?campaign=Direct">{marketingContent.waitlistCTAButtonText}</Link>
          </Button>
          <Button variant="secondary" className="w-min px-5 py-6 text-lg md:px-10 md:py-8 md:text-2xl">
            {marketingContent.secondaryCTAButtonText}
          </Button>
        </div>
      </main>
      <section
        id="features"
        className="mx-auto mb-12 flex min-h-screen max-w-screen-lg flex-col items-center justify-center rounded-2xl"
      >
        <h2 className="text-3xl md:text-4xl">{marketingContent.featuresSectionTitle}</h2>
        <FeatureCardGrid />
      </section>
    </div>
  );
}
