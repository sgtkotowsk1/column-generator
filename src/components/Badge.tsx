import type { FC, ReactNode } from 'react';

type Variant = 'default' | 'success' | 'error';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  default: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
  error:   'bg-red-50 text-red-700 border-red-200',
};

export const Badge: FC<BadgeProps> = ({ variant = 'default', children }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
    {children}
  </span>
);
