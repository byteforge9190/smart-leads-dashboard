import React, { useState } from "react";
import { Plus, TrendingUp, Users, Clock, BarChart3 } from "lucide-react";
import { Layout } from "./Layout";
import { StatsCards } from "./StatsCard";
import { Modal } from "../../components/ui/Model";
import LeadForm from "./LeadForm";
import { StatusBadge, SourceBadge } from "../../components/ui/Badge";
import { useUser } from "../../store/user.store";
import { useLeadAvailable } from "../../hooks/useLead";

export const DashboardPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const name = useUser((state) => state.name);
  const availLeads = useUser((state) => state.leads);
  const { data, isSuccess, isError, error, isLoading } =
    useLeadAvailable(!!availLeads);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const conversionRate = data?.data
    ? Math.round(((data.data.funnel.QUALIFIED ?? 0) / availLeads) * 100)
    : 0;

  return (
    <Layout>
      <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
              {greeting()} {name.split(" ")[0]} 👋
            </p>
            <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>

        {/* Stats */}
        <StatsCards data={data?.data} />

        {/* Conversion + Source breakdown */}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion funnel */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp
                  size={18}
                  className="text-brand-600 dark:text-brand-400"
                />
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Lead Funnel
                </h2>
              </div>
              <div className="space-y-3">
                {(
                  [
                    {
                      label: "New",
                      key: "New",
                      color: "bg-blue-500",
                      light: "bg-blue-100 dark:bg-blue-900/30",
                    },
                    {
                      label: "Contacted",
                      key: "Contacted",
                      color: "bg-amber-500",
                      light: "bg-amber-100 dark:bg-amber-900/30",
                    },
                    {
                      label: "Qualified",
                      key: "Qualified",
                      color: "bg-emerald-500",
                      light: "bg-emerald-100 dark:bg-emerald-900/30",
                    },
                    {
                      label: "Lost",
                      key: "Lost",
                      color: "bg-red-400",
                      light: "bg-red-100 dark:bg-red-900/30",
                    },
                  ] as const
                ).map(({ label, key, color, light }) => {
                  const count =
                    data?.data.funnel[
                      key.toUpperCase() as keyof typeof data.data.funnel
                    ] ?? 0;
                  const pct =
                    availLeads > 0 ? Math.round((count / availLeads) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {label}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {count}{" "}
                          <span className="text-slate-400 font-normal">
                            ({pct}%)
                          </span>
                        </span>
                      </div>
                      <div
                        className={`h-2 rounded-full ${light} overflow-hidden`}
                      >
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-400">
                  Conversion rate:{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                    {conversionRate}%
                  </span>
                </p>
              </div>
            </div>

            {/* Source breakdown */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3
                  size={18}
                  className="text-brand-600 dark:text-brand-400"
                />
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Leads by Source
                </h2>
              </div>
              <div className="space-y-4">
                {(
                  [
                    {
                      label: "Website",
                      emoji: "🌐",
                      color: "bg-violet-500",
                      light: "bg-violet-100 dark:bg-violet-900/30",
                    },
                    {
                      label: "Instagram",
                      emoji: "📸",
                      color: "bg-pink-500",
                      light: "bg-pink-100 dark:bg-pink-900/30",
                    },
                    {
                      label: "Referral",
                      emoji: "🤝",
                      color: "bg-teal-500",
                      light: "bg-teal-100 dark:bg-teal-900/30",
                    },
                  ] as const
                ).map(({ label, emoji, color, light }) => {
                  const count =
                    data?.data.source[
                      label.toUpperCase() as keyof typeof data.data.source
                    ] ?? 0;
                  const pct =
                    availLeads > 0 ? Math.round((count / availLeads) * 100) : 0;
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {emoji} {label}
                        </span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {count}
                        </span>
                      </div>
                      <div
                        className={`h-2.5 rounded-full ${light} overflow-hidden`}
                      >
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Recent Leads */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Recent Leads
              </h2>
            </div>
            <a
              href="/leads"
              className="text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              View all →
            </a>
          </div>

          {isLoading ? (
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="skeleton w-9 h-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <div className="skeleton h-3.5 w-32" />
                  <div className="skeleton h-3 w-44" />
                </div>
                <div className="skeleton h-6 w-20 rounded-full" />
              </div>
            </div>
          ) : availLeads === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users
                size={28}
                className="text-slate-300 dark:text-slate-600 mb-3"
              />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No leads yet. Add your first one!
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users
                size={28}
                className="text-slate-300 dark:text-slate-600 mb-3"
              />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Error: {error.message}
              </p>
            </div>
          ) : (
            isSuccess && (
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {data.data.first.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {data.data.first.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {data.data.first.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <SourceBadge source={data.data.first.source} />
                    <StatusBadge status={data.data.first.status} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Lead"
      >
        <LeadForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </Layout>
  );
};
