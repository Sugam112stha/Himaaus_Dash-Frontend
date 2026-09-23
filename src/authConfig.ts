// Login gate for the dashboard, now backed by a real API + database
// instead of a hardcoded username/password.

// Where the backend API lives. Set VITE_API_URL in a .env file at the
// project root to point somewhere else (e.g. a deployed backend).
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// The key we save the login token under in the browser, so refreshing
// the page keeps you logged in.
export const AUTH_STORAGE_KEY = 'himaaus-dash-auth-token'
