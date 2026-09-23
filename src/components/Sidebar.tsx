import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, GraduationCap, X } from 'lucide-react'
import { navSections } from '../data'
import { pathForItem, pathForSubItem } from '../lib/routes'

interface SidebarProps {
  open: boolean
  onClose: () => void
  onNavigate: () => void
  collapsed: boolean
}

export default function Sidebar({ open, onClose, onNavigate, collapsed }: SidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const location = useLocation()

  const toggleExpanded = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-surface-border bg-white transition-all duration-200 ease-out lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-[76px]' : 'lg:w-64'} w-64`}
      >
        {/* Brand */}
        <div className="flex h-[65px] shrink-0 items-center justify-between border-b border-surface-border px-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm shadow-brand-600/20">
              <GraduationCap size={18} strokeWidth={2.25} />
            </div>
            <div className={`leading-tight transition-opacity duration-150 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="whitespace-nowrap text-[15px] font-bold text-surface-heading">Admin</p>
              <p className="whitespace-nowrap text-[11px] text-surface-muted">Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-6 pt-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-1 mt-4 first:mt-0">
              {section.title && (
                <p
                  className={`px-2.5 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-slate-400 ${
                    collapsed ? 'lg:hidden' : ''
                  }`}
                >
                  {section.title}
                </p>
              )}

              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const itemPath = pathForItem(item.label)
                  const isActive = !item.hasChildren && location.pathname === itemPath
                  const isExpanded = expanded.has(item.label)
                  const Icon = item.icon

                  // Items with a dropdown navigate to their first sub-item
                  // AND expand/collapse the sub-menu.
                  if (item.hasChildren) {
                    const firstSubPath = item.subItems
                      ? pathForSubItem(item.label, item.subItems[0])
                      : itemPath
                    const isParentActive = item.subItems?.some(
                      (sub) => location.pathname === pathForSubItem(item.label, sub)
                    )

                    return (
                      <li key={item.label}>
                        <div
                          className={`group relative flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors ${
                            collapsed ? 'lg:justify-center lg:px-0 lg:py-2.5' : ''
                          } ${
                            isParentActive
                              ? 'bg-brand-50 text-brand-600'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-surface-heading'
                          }`}
                        >
                          <Link
                            to={firstSubPath}
                            onClick={(e) => {
                              if (!isExpanded) {
                                toggleExpanded(item.label)
                              }
                              onNavigate()
                            }}
                            title={collapsed ? item.label : undefined}
                            className={`flex items-center gap-2.5 ${collapsed ? 'lg:gap-0' : ''}`}
                          >
                            <Icon
                              size={16.5}
                              strokeWidth={2}
                              className={isParentActive ? 'text-brand-500' : 'text-slate-400 group-hover:text-slate-500'}
                            />
                            <span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span>
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleExpanded(item.label)
                            }}
                            className={`rounded p-0.5 transition-colors hover:bg-slate-200/60 ${collapsed ? 'lg:hidden' : ''}`}
                            aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                          >
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-150 ${
                                isExpanded ? 'rotate-180' : ''
                              } text-slate-300`}
                            />
                          </button>
                        </div>

                        {item.subItems && (
                          <div
                            className={`grid overflow-hidden transition-all duration-200 ${
                              collapsed ? 'lg:hidden' : ''
                            } ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                          >
                            <ul className="min-h-0 space-y-0.5 py-1 pl-[34px]">
                              {item.subItems.map((sub) => {
                                const subPath = pathForSubItem(item.label, sub)
                                const isSubActive = location.pathname === subPath
                                return (
                                  <li key={sub}>
                                    <Link
                                      to={subPath}
                                      onClick={onNavigate}
                                      className={`block w-full rounded-md px-2.5 py-1.5 text-left text-[12.5px] transition-colors ${
                                        isSubActive
                                          ? 'bg-brand-50 font-semibold text-brand-600'
                                          : 'text-slate-500 hover:bg-slate-50 hover:text-surface-heading'
                                      }`}
                                    >
                                      {sub}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )}
                      </li>
                    )
                  }

                  // Plain items are real links to their own page.
                  return (
                    <li key={item.label}>
                      <Link
                        to={itemPath}
                        onClick={onNavigate}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13.5px] font-medium transition-colors ${
                          collapsed ? 'lg:justify-center lg:gap-0 lg:px-0 lg:py-2.5' : ''
                        } ${
                          isActive
                            ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/25'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-surface-heading'
                        }`}
                      >
                        <Icon size={16.5} strokeWidth={2} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500'} />
                        <span className={collapsed ? 'lg:hidden' : ''}>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={`shrink-0 border-t border-surface-border p-3 ${collapsed ? 'lg:hidden' : ''}`}>
          <div className="rounded-lg bg-slate-50 px-3 py-2.5 text-[11.5px] text-slate-400">
            <p className="font-semibold text-slate-500">v1.0.0</p>
            <p>Frontend build</p>
          </div>
        </div>
      </aside>
    </>
  )
}
