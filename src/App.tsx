// The top of the app. In plain words, what happens here:
//   - If there's no saved login token, or the backend says it's no longer
//     valid, show the login page — no matter what page they typed into
//     the address bar.
//   - Once logged in, hand off to AppRoutes.tsx, which decides which page
//     to show based on the current URL.

import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import AppRoutes from './AppRoutes'
import { AUTH_STORAGE_KEY } from './authConfig'
import { verifyToken } from './lib/authApi'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

export default function App() {
  const [status, setStatus] = useState<AuthStatus>('checking')

  // On first load, check whether a saved token is still good — a token
  // being present doesn't mean it hasn't expired or been revoked.
  useEffect(() => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!token) {
      setStatus('unauthenticated')
      return
    }
    verifyToken(token).then((isValid) => {
      if (!isValid) localStorage.removeItem(AUTH_STORAGE_KEY)
      setStatus(isValid ? 'authenticated' : 'unauthenticated')
    })
  }, [])

  function handleLoginSuccess(token: string) {
    localStorage.setItem(AUTH_STORAGE_KEY, token)
    setStatus('authenticated')
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setStatus('unauthenticated')
  }

  if (status === 'checking') {
    // Brief, quiet placeholder while we ask the backend "is this token
    // still valid?" — avoids a flash of the login page for people who
    // are actually already logged in.
    return <div className="min-h-screen bg-surface-bg" />
  }

  if (status === 'unauthenticated') {
    return <LoginPage onSuccess={handleLoginSuccess} />
  }

  return <AppRoutes onLogout={handleLogout} />
}
