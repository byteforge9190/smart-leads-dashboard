import { Controller, useForm, useWatch, type SubmitHandler } from "react-hook-form";
import {
  registerSchema,
  type RegisterType,
} from "../../validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";

export default function Register() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "SALES",
    },
  });
  const watchRegister = useWatch({
    control,
  });

  const registration = useRegister()

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Zap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">
            SmartLeads
          </span>
        </div>

        <div className="card p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Start managing leads in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                className={`input ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="e.g. Rahul Sharma"
                {...register("name")}
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className={`input ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="you@example.com"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input pr-10 ${errors.password ? "border-red-400 focus:ring-red-400" : ""}`}
                  placeholder="Min. 6 characters"
                  {...register("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="role"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      {(["ADMIN", "SALES"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => field.onChange(r)}
                          className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 capitalize ${
                            field.value === r
                              ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400"
                              : fieldState.invalid
                                ? "border-red-400 dark:border-red-400/50 text-slate-600 dark:text-slate-400"
                                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        >
                          {r === "ADMIN" ? "🛡 Admin" : "📊 Sales"}
                        </button>
                      ))}
                    </>
                  )} 
                />
              </div>
              {errors.role ? (
                <p className="mt-1 text-xs text-red-500">
                  {errors.role.message as string}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-slate-400">
                  {!watchRegister.role
                    ? "Select a role for your account"
                    : watchRegister.role === "ADMIN"
                      ? "Admins can view and manage all leads"
                      : "Sales users manage their own leads"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registration.isPending}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {registration.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Creating
                  account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
