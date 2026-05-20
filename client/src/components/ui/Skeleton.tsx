import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} />
);

export const LeadRowSkeleton: React.FC = () => (
  <tr className="border-b border-slate-50 dark:border-slate-800/50">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
    <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
    <td className="px-6 py-4"><Skeleton className="h-3.5 w-24" /></td>
    <td className="px-6 py-4">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </td>
  </tr>
);