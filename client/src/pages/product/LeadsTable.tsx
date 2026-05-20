import { useState } from "react";
import { SourceBadge, StatusBadge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Model";
import type { LeadDetailsDto } from "../../types/lead.type";
import { Edit2, Trash2 } from "lucide-react";
import LeadForm from "./LeadForm";

export default function LeadsTable({ data }: { data: LeadDetailsDto }) {
  const [editingLead, setEditingLead] = useState<LeadDetailsDto | undefined>(
    undefined,
  );
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  const handleDelete = () => {};
  return (
    <>
      <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors animate-fade-in">
        {/* Lead */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials(data.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {data.name}
              </p>
              <p className="text-xs text-slate-400">{data.email}</p>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          <StatusBadge status={data.status} />
        </td>

        {/* Source */}
        <td className="px-6 py-4">
          <SourceBadge source={data.source} />
        </td>

        {/* Created */}
        <td className="px-6 py-4">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
            {formatDate(data.createdAt.toString())}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setEditingLead(data)}
              className="p-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              title="Edit lead"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={handleDelete}
              disabled={}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
              title="Delete lead"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      </tr>

      <Modal
        isOpen={!!editingLead}
        onClose={() => setEditingLead(undefined)}
        title="Edit Lead"
      >
        {editingLead && (
          <LeadForm
            lead={editingLead}
            onClose={() => setEditingLead(undefined)}
          />
        )}
      </Modal>
    </>
  );
}
