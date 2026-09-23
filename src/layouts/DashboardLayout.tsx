// The shared shell every page sits inside: sidebar on the left, top bar
// on top, and whichever page matches the current URL in the middle.
// <Outlet /> is where React Router drops in that matching page.

import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { navSections } from '../data'
import { buildRouteList } from '../lib/routes'

// One list of every page the sidebar can link to, built once from the
// menu data. Used here just to look up a friendly title for the top bar.
const allRoutes = buildRouteList(navSections)

interface DashboardLayoutProps {
  onLogout: () => void
}

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Find a friendly title for the page we're currently looking at.
  const currentRoute = allRoutes.find((route) => route.path === location.pathname)
  const pageTitle = currentRoute?.label ?? 'Overview'

  return (
    <div className="flex min-h-screen bg-surface-bg">
      <Sidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onNavigate={() => setMobileSidebarOpen(false)}
        collapsed={collapsed}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar
          title={pageTitle}
          userName="himaaus-edu"
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          onLogout={onLogout}
        />

        <main className="flex-1 space-y-4 px-3.5 py-4 sm:space-y-5 sm:px-6 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}


