import { BookCheckIcon, BoxesIcon, SparklesIcon, Tally5Icon } from "lucide-react";

import { featuresContent } from "ZL/content";
import FeatureCard from "./FeatureCard";

export default function FeatureCardGrid() {
  // TODO: Find a better way to handle icons?
  const iconSet = [
    <BoxesIcon key={"boxIcon"} size={48} className="text-yellow-500" />,
    <BookCheckIcon key={"bookCheckIcon"} size={48} className="text-yellow-500" />,
    <Tally5Icon key={"tally5Icon"} size={48} className="text-yellow-500" />,
    <SparklesIcon key={"sparklesIcon"} size={48} className="text-yellow-500" />,
  ];
  return (
    <div className="mt-16 flex flex-col gap-4 md:grid md:grid-cols-2">
      {featuresContent.features.map((feature, index) => (
        <FeatureCard {...feature} key={feature.key} Icon={iconSet[index]} />
      ))}
    </div>
  );
}
