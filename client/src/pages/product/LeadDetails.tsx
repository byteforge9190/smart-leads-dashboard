import { useLeadDetails } from "../../hooks/useLead";
import React from "react";
import {
  Mail,
  Calendar,
  User,
  Shield,
  Clock,
  FileText,
  Tag,
  Zap,
} from "lucide-react";
import { StatusBadge, SourceBadge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";

const Field: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <div className="text-sm text-slate-800 dark:text-slate-100 break-words">
        {value}
      </div>
    </div>
  </div>
);

export default function LeadDetail({ id }: { id: string }) {
  const { isLoading, isError, error, data, isSuccess } = useLeadDetails(id);
  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatDateTime = (date: Date | string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (isError) return <div>Error: {error.message}</div>;
  if (isLoading) return <Skeleton />;

  return (
    <>
      {isSuccess && (
        <div className="space-y-6">
          {/* Header — avatar + name + badges */}
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {getInitials(data.data.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">
                {data.data.name}
              </h3>
              <p className="text-sm text-slate-400 truncate mb-2">
                {data.data.email}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={data.data.status} />
                <SourceBadge source={data.data.source} />
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              icon={<Mail size={15} />}
              label="Email"
              value={data.data.email}
            />

            <Field
              icon={<Tag size={15} />}
              label="Status"
              value={<StatusBadge status={data.data.status} />}
            />

            <Field
              icon={<Zap size={15} />}
              label="Source"
              value={<SourceBadge source={data.data.source} />}
            />

            <Field
              icon={<Calendar size={15} />}
              label="Created On"
              value={formatDate(data.data.createdAt)}
            />

            <Field
              icon={<Clock size={15} />}
              label="Last Updated"
              value={formatDateTime(data.data.updatedAt)}
            />

            <Field
              icon={<User size={15} />}
              label="Created By"
              value={
                <div>
                  <p className="font-medium">{data.data.createdBy.name}</p>
                  <p className="text-xs text-slate-400">
                    {data.data.createdBy.email}
                  </p>
                </div>
              }
            />

            <Field
              icon={<Shield size={15} />}
              label="Creator Role"
              value={
                <span className="capitalize inline-flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      data.data.createdBy.role === "ADMIN"
                        ? "bg-brand-500"
                        : "bg-slate-400"
                    }`}
                  />
                  {data.data.createdBy.role}
                </span>
              }
            />
          </div>

          {/* Notes — full width */}
          <Field
            icon={<FileText size={15} />}
            label="Notes"
            value={
              data.data.notes ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {data.data.notes}
                </p>
              ) : (
                <p className="text-slate-400 italic">No notes added</p>
              )
            }
          />

          {/* Footer — ID */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400 font-mono">
              ID: {data.data._id}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
