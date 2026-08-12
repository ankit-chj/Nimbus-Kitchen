import { cn } from '../../lib/cn';

interface PriceTagProps {
  amount: number;
  className?: string;
  currency?: string;
}

export function PriceTag({ amount, className, currency = '₹' }: PriceTagProps) {
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return (
    <span
      className={cn(
        'font-semibold tabular-nums tracking-tight',
        className
      )}
    >
      {currency}
      {safeAmount.toLocaleString('en-IN')}
    </span>
  );
}
