import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
          light ? 'text-white' : 'text-dark'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-white/80' : 'text-dark/60'
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'w-20 h-1 rounded-full mt-4',
          centered && 'mx-auto',
          light ? 'bg-accent' : 'bg-primary'
        )}
      />
    </div>
  );
}
