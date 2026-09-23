// Talks to the backend's login endpoints.

import { API_BASE_URL } from '../authConfig'

interface LoginResponse {
  token: string
  user: { username: string }
}

// Sends a username/password to the backend. Throws an Error with a
// friendly message if the login fails, so the login page can just show
// err.message.
export async function login(username: string, password: string): Promise<LoginResponse> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error("Can't reach the server. Is the backend running?")
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Login failed.')
  }

  return data as LoginResponse
}

// Asks the backend "is this saved token still valid?" — used on app
// load so a stale/expired token doesn't silently keep someone "logged in".
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.ok
  } catch {
    return false
  }
}
