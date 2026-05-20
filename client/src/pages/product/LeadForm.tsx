import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type {
  CreateLeadType,
  UpdateLeadType,
} from "../../validations/leads.validate";
import {
  updateLeadSchema,
  createLeadSchema,
} from "../../validations/leads.validate";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import type { LeadDto, LeadSource, LeadStatus } from "../../types/lead.type";
import { useLeadCreate, useUpdateLead } from "../../hooks/useLead";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { queryKey } from "../../utils/constants";
import { useQueryClient } from "@tanstack/react-query";

type LeadFormValues = CreateLeadType | UpdateLeadType;

const STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Lost"];
const SOURCES: LeadSource[] = ["Website", "Instagram", "Referral"];

export default function LeadForm({
  onClose,
  lead,
}: {
  onClose: () => void;
  lead?: LeadDto;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(lead ? updateLeadSchema : createLeadSchema),
    defaultValues: {
      name: lead ? lead.name : "",
      email: lead ? lead.email : "",
      source: lead ? lead.source : "Website",
      status: lead ? lead.status : "New",
    },
  });
  const create = useLeadCreate();
  const update = useUpdateLead();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<LeadFormValues> = (data) => {
    console.log(data);
    if (lead) {
      update.mutate(
        { lead: data as UpdateLeadType, id: lead._id },
        {
          onSuccess: (result) => {
            toast.success(result.message);
            onClose();
            queryClient.invalidateQueries({ queryKey: [queryKey.LEAD] });
            queryClient.invalidateQueries({ queryKey: [queryKey.USER] });
          },
          onError: (err) => {
            toast.error(err.message);
            console.error(err.error);
          },
        },
      );
    } else
      create.mutate(data as CreateLeadType, {
        onSuccess: (result) => {
          toast.success(result.message);
          onClose();
          queryClient.invalidateQueries({ queryKey: [queryKey.LEAD] });
          queryClient.invalidateQueries({ queryKey: [queryKey.USER] });
        },
        onError: (err) => {
          toast.error(err.message);
          console.error(err.error);
        },
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="label">Full Name</label>
        <Controller
          control={control}
          name={"name"}
          render={({ field, fieldState }) => (
            <>
              <input
                aria-invalid={fieldState.invalid}
                type="text"
                className={`input ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="e.g. Rahul Sharma"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.invalid && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label className="label">Email Address</label>
        <Controller
          control={control}
          name={"email"}
          render={({ field, fieldState }) => (
            <>
              <input
                aria-invalid={fieldState.invalid}
                type="email"
                className={`input ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="e.g. rahul@example.com"
                {...field}
                value={field.value}
              />
              {fieldState.invalid && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Status</label>
          <Controller
            control={control}
            name={"status"}
            render={({ field, fieldState }) => (
              <>
                <select
                  aria-invalid={fieldState.invalid}
                  className="input"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value as LeadStatus)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {fieldState.invalid && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div>
          <label className="label">Source</label>
          <Controller
            control={control}
            name={"source"}
            render={({ field, fieldState }) => (
              <>
                <select
                  aria-invalid={fieldState.invalid}
                  className="input"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value as LeadSource)}
                >
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {fieldState.invalid && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div>
        <label className="label">
          Notes{" "}
          <span className="normal-case font-normal text-slate-400">
            (optional)
          </span>
        </label>
        <Controller
          control={control}
          name={"notes"}
          render={({ field, fieldState }) => (
            <>
              <textarea
                aria-invalid={fieldState.invalid}
                className="input resize-none"
                rows={3}
                placeholder="Any additional notes about this lead..."
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
              {fieldState.error && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          disabled={create.isPending || update.isPending}
          onClick={() => onClose()}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={create.isPending || update.isPending}
          className="btn-primary flex-1 justify-center"
        >
          {create.isPending || update.isPending ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Saving...
            </>
          ) : lead ? (
            "Update Lead"
          ) : (
            "Create Lead"
          )}
        </button>
      </div>
    </form>
  );
}
