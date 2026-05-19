import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginType } from "../../validations/auth.validate";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const login = useLogin()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    login.mutate(data,{
      onSuccess: (result) => {
        console.log(result.data)
        toast.success(result.message)
        localStorage.setItem('token',result.data.token)
        navigate('/dashboard')
      },
      onError: (err) => {
        console.error(err.error)
        toast.error(err.message)
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">

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
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage your leads
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className={`input ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                placeholder="you@example.com"
                {...register('email')}
                autoComplete="email"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input pr-10 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="••••••••"
                  {...register('password')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {login.isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl text-center">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <span className="font-semibold">Demo:</span> Register a new account to get started
          </p>
        </div>
      </div>
    </div>
  )
}
