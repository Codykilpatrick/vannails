import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-md overflow-hidden',
        hover && 'transition-shadow duration-300 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
