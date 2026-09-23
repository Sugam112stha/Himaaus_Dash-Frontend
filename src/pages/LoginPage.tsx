import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { login } from '../lib/authApi'

interface LoginPageProps {
  onSuccess: (token: string) => void
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const { token } = await login(username.trim(), password)
      onSuccess(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl2 bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-bold text-white shadow-card">
            H
          </div>
          <h1 className="text-lg font-bold text-surface-heading">Himaaus Dashboard</h1>
          <p className="text-[13px] text-surface-muted">Sign in to continue</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl2 border border-surface-border bg-surface-card p-6 shadow-card"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
                Username
              </span>
              <span className="relative block">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
                Password
              </span>
              <span className="relative block">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-9 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-lg bg-brand-600 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
