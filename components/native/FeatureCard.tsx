type FeatureCardProps ={
  key: string,
  title: string,
  body: string,
  Icon: JSX.Element;
}
export default function FeatureCard({key, title, body, Icon}: FeatureCardProps) {
  return (
    <div className="flex min-h-40 min-w-80 flex-col gap-4 rounded-lg border border-yellow-500 p-6" key={key}>
      {Icon}
      <h3 className="text-balance text-2xl md:text-3xl">{title}</h3>
      <p className="text-balance text-lg md:text-xl">{body}</p>
    </div>
  )
}
