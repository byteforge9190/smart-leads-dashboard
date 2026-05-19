import { Users, TrendingUp, Zap, Camera } from "lucide-react";
import type { LeadAvailableDto } from "../../types/lead.type";
import { useUser } from "../../store/user.store";

export const StatsCards = ({ data }: { data?: LeadAvailableDto }) => {
  const leads = useUser((state) => state.leads);

  const cards = [
    {
      label: "Total Leads",
      value: leads,
      icon: Users,
      color:
        "text-brand-600 bg-brand-50 dark:bg-brand-900/30 dark:text-brand-400",
      sub: `${leads} this week`,
    },
    {
      label: "Qualified",
      value: data ? data.funnel.QUALIFIED : 0,
      icon: TrendingUp,
      color:
        "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
      sub: `${data ? data.funnel.QUALIFIED : 0} new`,
    },
    {
      label: "Contacted",
      value: data ? data.funnel.CONTACTED : 0,
      icon: Zap,
      color:
        "text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
      sub: `${data ? data.funnel.CONTACTED : 0} lost`,
    },
    {
      label: "From Instagram",
      value: data ? data.source.INSTAGRAM : 0,
      icon: Camera,
      color: "text-pink-600 bg-pink-50 dark:bg-pink-900/30 dark:text-pink-400",
      sub: `${data ? data.source.INSTAGRAM : 0} referrals`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="card p-5 animate-slide-up">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {card.label}
            </p>
            <div className={`p-2 rounded-xl ${card.color}`}>
              <card.icon size={16} />
            </div>
          </div>
          <p className="text-3xl font-bold font-display text-slate-800 dark:text-slate-100 mb-1">
            {card.value.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400">{card.sub}</p>
        </div>
      ))}
    </div>
  );
};
