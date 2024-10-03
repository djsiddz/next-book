import FeatureCard from "./FeatureCard";

import type { IconName } from "ZC/ui/icon";
import { featuresContent } from "ZL/content";

enum FeatureKeys {
  ALL = "allBooks",
  TRACK = "trackProgress",
  BUILD = "buildHabit",
  RECOMMEND = "recommendationsFromAI",
}

type FeatureContent = { title: string; body: string; iconName: IconName };

const FEATURES: Record<FeatureKeys, FeatureContent> = {
  [FeatureKeys.ALL]: { ...featuresContent.allBooks, iconName: "boxes" } as FeatureContent,
  [FeatureKeys.TRACK]: { ...featuresContent.trackProgress, iconName: "book-check" } as FeatureContent,
  [FeatureKeys.BUILD]: { ...featuresContent.buildHabit, iconName: "tally-5" } as FeatureContent,
  [FeatureKeys.RECOMMEND]: { ...featuresContent.recommendationsFromAI, iconName: "sparkles" } as FeatureContent,
} as const;

export default function FeatureCardGrid() {
  return (
    <div className="mt-16 flex flex-col gap-4 md:grid md:grid-cols-2">
      {Object.keys(FEATURES).map((key) => {
        const feature = FEATURES[key as FeatureKeys];
        return (
          <FeatureCard
            {...feature}
            key={key}
            iconProps={{
              name: feature.iconName,
              size: 48,
              className: "text-yellow-400",
            }}
          />
        );
      })}
    </div>
  );
}
