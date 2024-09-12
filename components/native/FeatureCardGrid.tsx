import { BookCheckIcon, BoxesIcon, SparklesIcon, Tally5Icon } from "lucide-react";

import FeatureCard from "./FeatureCard";
import { featuresContent } from "ZL/content";

export default function FeatureCardGrid() {
  // TODO: Find a better way to handle icons?
  const iconSet = [
    <BoxesIcon key={"boxIcon"} size={48} className="text-yellow-500" />,
    <BookCheckIcon key={"boxIcon"} size={48} className="text-yellow-500" />,
    <Tally5Icon key={"boxIcon"} size={48} className="text-yellow-500" />,
    <SparklesIcon key={"boxIcon"} size={48} className="text-yellow-500" />,
  ];
  return (
    <div className="mt-16 flex flex-col gap-4 md:grid md:grid-cols-2">
      {featuresContent.features.map((feature, index) => (
        <FeatureCard {...feature} key={feature.key} Icon={iconSet[index]} />
      ))}
    </div>
  );
}
