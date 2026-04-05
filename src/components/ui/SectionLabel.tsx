type SectionLabelProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionLabel({
  title,
  subtitle,
  className,
}: SectionLabelProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-[65ch] mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
