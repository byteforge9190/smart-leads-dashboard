import React from 'react';
import type { LeadStatus, LeadSource } from '../../types/lead.type';

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  New: {
    label: 'New',
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800',
  },
  Contacted: {
    label: 'Contacted',
    className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800',
  },
  Qualified: {
    label: 'Qualified',
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800',
  },
  Lost: {
    label: 'Lost',
    className: 'bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800',
  },
};

const sourceConfig: Record<LeadSource, { label: string; className: string }> = {
  Website: {
    label: '🌐 Website',
    className: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:ring-violet-800',
  },
  Instagram: {
    label: '📸 Instagram',
    className: 'bg-pink-50 text-pink-700 ring-1 ring-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:ring-pink-800',
  },
  Referral: {
    label: '🤝 Referral',
    className: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:ring-teal-800',
  },
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <span className={`badge ${config.className}`}>{config.label}</span>
  );
};

interface SourceBadgeProps {
  source: LeadSource;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source }) => {
  const config = sourceConfig[source];
  return (
    <span className={`badge ${config.className}`}>{config.label}</span>
  );
};
