import FeatureCard from "./FeatureCard";

import { IconName } from "ZC/ui/icon";
import { featuresContent } from "ZL/content";

export default function FeatureCardGrid() {
  return (
    <div className="mt-16 flex flex-col gap-4 md:grid md:grid-cols-2">
      {featuresContent.features.map((feature) => (
        <FeatureCard
          {...feature}
          key={feature.key}
          iconProps={{
            name: feature.iconName as IconName,
            size: 48,
            className: "text-yellow-400",
          }}
        />
      ))}
    </div>
  );
}
