import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Plus, Trash2, Search, Filter, Mail, Phone, Linkedin, CheckCircle, XCircle } from 'lucide-react'
import type { TeamMember } from '../types'
import { teamMembers as initialMembers } from '../data'

const STORAGE_KEY = 'himaaus_team_members'

export default function TeamMembersList() {
  const navigate = useNavigate()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // Load from localStorage or mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setMembers(JSON.parse(stored))
      } catch (e) {
        setMembers(initialMembers)
      }
    } else {
      setMembers(initialMembers)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMembers))
    }
  }, [])

  function saveMembers(newMembers: TeamMember[]) {
    setMembers(newMembers)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMembers))
  }

  function toggleActive(id: string) {
    const updated = members.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    saveMembers(updated)
  }

  function confirmDelete() {
    if (deleteId) {
      const updated = members.filter((m) => m.id !== deleteId)
      saveMembers(updated)
      setDeleteId(null)
    }
  }

  // Get unique departments for filter dropdown
  const departments = Array.from(new Set(members.map((m) => m.department)))

  // Filtered list
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDept = deptFilter === 'All' || member.department === deptFilter

    return matchesSearch && matchesDept
  })

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            All Team Members
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Manage your educational consultancy team profiles.
          </p>
        </div>
        <Link
          to="/team-profiles/add-member"
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Member
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-surface-border bg-white p-4 shadow-card">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search team by name, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-slate-50/70 py-2 pl-9 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={14} className="text-slate-400" />
          <span className="text-[12px] font-medium text-slate-500">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-lg border border-surface-border bg-slate-50/70 px-2.5 py-1.5 text-[12.5px] text-slate-600 outline-none focus:border-brand-400 focus:bg-white"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Team Cards */}
      {filteredMembers.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-12 text-center">
          <p className="text-[13.5px] font-semibold text-slate-500">No team members found</p>
          <p className="text-[12px] text-slate-400 mt-1">Try resetting filters or add a new team member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => {
            const initial = member.name.charAt(0).toUpperCase()
            return (
              <div
                key={member.id}
                className={`rounded-xl2 border border-surface-border bg-white p-5 shadow-card transition-all flex flex-col justify-between ${
                  !member.isActive ? 'opacity-70 bg-slate-50/50' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {member.imageSrc ? (
                        <img
                          src={member.imageSrc}
                          alt={member.name}
                          className="h-11 w-11 rounded-full object-cover border border-slate-100"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[15px] font-bold text-white shadow-sm">
                          {initial}
                        </div>
                      )}
                      <div>
                        <h3 className="text-[14.5px] font-bold text-surface-heading leading-tight">{member.name}</h3>
                        <p className="text-[12px] text-brand-600 font-semibold mt-0.5">{member.role}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-450 bg-slate-100 rounded px-1.5 py-0.5">
                          {member.department}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => navigate(`/team-profiles/edit-member/${member.id}`)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-brand-600"
                        title="Edit profile"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(member.id)}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Remove member"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3.5 text-[12.5px] text-slate-650 leading-relaxed min-h-[50px] line-clamp-3" title={member.bio}>
                    {member.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-[12px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-400" />
                    <span>{member.phone}</span>
                  </div>

                  <div className="mt-3 pt-1 flex items-center justify-between">
                    {member.linkedinUrl ? (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand-650 hover:text-brand-850"
                      >
                        <Linkedin size={13} /> LinkedIn Profile
                      </a>
                    ) : (
                      <span className="text-[11.5px] text-slate-400 italic">No LinkedIn link</span>
                    )}

                    <button
                      onClick={() => toggleActive(member.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        member.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {member.isActive ? (
                        <>
                          <CheckCircle size={10} /> Active
                        </>
                      ) : (
                        <>
                          <XCircle size={10} /> Inactive
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl2 border border-surface-border bg-white p-5 shadow-lg"
          >
            <h3 className="text-[14.5px] font-bold text-surface-heading">Remove member?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              Are you sure you want to remove this team member? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
