import dynamic from "next/dynamic";
// TODO: Handle this better
// eslint-disable-next-line import/named
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Suspense } from "react";

export type IconName = keyof typeof dynamicIconImports;

export interface IconProps extends LucideProps {
  name: IconName;
}

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;
const dynamicIcons = Object.fromEntries(
  Object.entries(dynamicIconImports).map(([name, loader]) => [name, dynamic(loader)]),
) as Record<IconName, React.ComponentType<LucideProps>>;

const DynamicIcon = ({ name, ...rest }: IconProps) => {
  const LucideIcon = dynamicIcons[name];

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...rest} />
    </Suspense>
  );
};

export default DynamicIcon;
