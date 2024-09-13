"use client";

import Image from "next/image";
import { Card, CardContent } from "ZC/ui/card";

interface BookCardProps {
  coverUrl?: string;
  title?: string | null;
  author?: string | null;
}

export function BookCard({
  coverUrl = "https://place-hold.it/300x400",
  title = "The Great Gatsby",
  author = "F. Scott Fitzgerald",
}: BookCardProps) {
  return (
    <Card className="w-[300px] overflow-hidden">
      <div className="relative w-full h-[400px]">
        <Image
          src={coverUrl}
          alt={`Cover of ${title}`}
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{author}</p>
      </CardContent>
    </Card>
  );
}
