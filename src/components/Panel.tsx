import type { FC, ReactNode } from 'react';

interface PanelProps {
  title: string;
  badge?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const Panel: FC<PanelProps> = ({ title, badge, footer, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      {badge}
    </div>
    {children}
    {footer && (
      <div className="flex items-center gap-2 flex-wrap px-4 py-2.5 border-t border-gray-100 bg-white">
        {footer}
      </div>
    )}
  </div>
);
