import { Controller, useForm, useWatch } from "react-hook-form";
import { useUser } from "../../store/user.store";
import {
  queryLeadSchema,
  type QueryLeadType,
} from "../../validations/leads.validate";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useAllLeads } from "../../hooks/useLead";
import { useState } from "react";
import { Layout } from "./Layout";
import {
  ArrowUpDown,
  Filter,
  Loader2,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import { Modal } from "../../components/ui/Model";
import LeadForm from "./LeadForm";
import type { LeadSource, LeadStatus, SortSource } from "../../types/lead.type";
import LeadsTable from "./LeadsTable";
import { LeadRowSkeleton } from "../../components/ui/Skeleton";

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Lost"];
const SOURCES: LeadSource[] = ["Website", "Instagram", "Referral"];

export default function AllLeads() {
  const availLeads = useUser((state) => state.leads);
  const { control, reset } = useForm<QueryLeadType>({
    resolver: zodResolver(queryLeadSchema),
  });
  const watch = useWatch({
    control,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    hasNextPage,
    isSuccess,
    isError,
    error,
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useAllLeads(!!availLeads, watch);

  if (!availLeads) return null;

  return (
    <Layout>
      <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Users size={18} className="text-slate-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {availLeads ? `${availLeads} total leads` : "Loading..."}
              </p>
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">
              Leads
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

        <div className="card p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Controller
                control={control}
                name={"search"}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      aria-invalid={fieldState.invalid}
                      type="text"
                      className="input pl-9"
                      placeholder="Search by name or email..."
                      // value={field.value}
                      {...field}
                    />
                    {field.value && (
                      <button
                        onClick={() => field.onChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </>
                )}
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <Controller
                control={control}
                name={"status"}
                render={({ field, fieldState }) => (
                  <select
                    aria-invalid={fieldState.invalid}
                    className="input pl-8 pr-8 min-w-[140px]"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value as LeadStatus)
                    }
                  >
                    <option value="">All Statuses</option>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Source filter */}
            <div className="relative">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <Controller
                control={control}
                name={"source"}
                render={({ field, fieldState }) => (
                  <select
                    aria-invalid={fieldState.invalid}
                    className="input pl-8 pr-8 min-w-[140px]"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value as LeadSource)
                    }
                  >
                    <option value="">All Statuses</option>
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <Controller
                control={control}
                name={"sort"}
                render={({ field, fieldState }) => (
                  <select
                    aria-invalid={fieldState.invalid}
                    className="input pl-8 pr-8 min-w-[140px]"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value as SortSource)
                    }
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {watch && (
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <X size={13} />
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {/* Skeleton while first page loads */}
                {isLoading &&
                  Array.from({ length: availLeads }).map((_, i) => (
                    <LeadRowSkeleton key={i} />
                  ))}

                {/* Actual rows */}
                {isSuccess &&
                  data.pages.flatMap((p) =>
                    p.data.leads.map((l) => (
                      <LeadsTable key={l._id} data={l} />
                    )),
                  )}

                {/* Empty state as a row */}
                {isSuccess && data.pages[0].data.leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-slate-400 text-sm">
                        No leads found. Try adjusting your filters.
                      </p>
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-slate-400 text-sm">
                        Error : {error.message}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Sentinel for infinite scroll */}
          <div className="h-4" />
          {hasNextPage && (
            <>
              <button
                className="flex justify-center py-4"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? "Loading" : "Load More"}
              </button>
            </>
          )}
        </div>

      </div>

      {/* Create modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Lead"
      >
        <LeadForm onClose={() => setShowCreateModal(false)} />
      </Modal>
    </Layout>
  );
}
