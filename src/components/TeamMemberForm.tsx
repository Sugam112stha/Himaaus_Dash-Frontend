import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, Plus } from 'lucide-react'
import type { TeamMember } from '../types'
import { teamMembers as initialMembers } from '../data'

const STORAGE_KEY = 'himaaus_team_members'

type FormState = {
  name: string
  role: string
  department: string
  email: string
  phone: string
  bio: string
  linkedinUrl: string
  imageSrc: string
  isActive: boolean
}

const EMPTY_FORM: FormState = {
  name: '',
  role: '',
  department: 'Counseling',
  email: '',
  phone: '',
  bio: '',
  linkedinUrl: '',
  imageSrc: '',
  isActive: true,
}

export default function TeamMemberForm() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  // Load members from localStorage or mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    let loadedMembers = initialMembers
    if (stored) {
      try {
        loadedMembers = JSON.parse(stored)
      } catch (e) {
        // Fallback
      }
    }
    setMembers(loadedMembers)

    // If ID exists, populate form for editing
    if (id) {
      const match = loadedMembers.find((m) => m.id === id)
      if (match) {
        setForm({
          name: match.name,
          role: match.role,
          department: match.department,
          email: match.email,
          phone: match.phone,
          bio: match.bio,
          linkedinUrl: match.linkedinUrl || '',
          imageSrc: match.imageSrc || '',
          isActive: match.isActive,
        })
      }
    }
  }, [id])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    let updatedList: TeamMember[]
    if (id) {
      // Editing
      updatedList = members.map((m) =>
        m.id === id ? { ...m, ...form } : m
      )
    } else {
      // Adding
      const newMember: TeamMember = {
        id: `tm-${Date.now()}`,
        ...form,
      }
      updatedList = [newMember, ...members]
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
    navigate('/team-profiles/all-members')
  }

  return (
    <div className="mx-auto w-full max-w-[800px] space-y-4 sm:space-y-5">
      {/* Header & Back Action */}
      <div className="flex items-center gap-3">
        <Link
          to="/team-profiles/all-members"
          className="rounded-lg border border-surface-border bg-white p-2 text-slate-500 hover:bg-slate-50 transition-colors"
          title="Back to list"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            {id ? 'Edit Team Member Profile' : 'Add New Team Member'}
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            {id ? 'Update existing member information and permissions.' : 'Create a new staff profile for the agency.'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-xl2 border border-surface-border bg-white p-5 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Full Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Suman Thapa"
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Professional Role</span>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="e.g. Senior Counselor"
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Department</span>
              <select
                value={form.department}
                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              >
                <option value="Management">Management</option>
                <option value="Counseling">Counseling</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="IT Support">IT Support</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">LinkedIn Profile URL</span>
              <input
                type="url"
                value={form.linkedinUrl}
                onChange={(e) => setForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                placeholder="e.g. https://linkedin.com/in/username"
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Email Address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="e.g. suman@himaaus.edu.np"
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Phone Number</span>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="e.g. +977-9801122334"
                className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Avatar Image URL (Optional)</span>
            <input
              type="url"
              value={form.imageSrc}
              onChange={(e) => setForm((f) => ({ ...f, imageSrc: e.target.value }))}
              placeholder="e.g. https://images.unsplash.com/... or blank for initials avatar"
              className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">Brief Biography</span>
            <textarea
              rows={4}
              required
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="Write a brief professional background of the team member..."
              className="w-full resize-none rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-brand-400 focus:bg-white"
            />
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                className="rounded border-surface-border text-brand-600 focus:ring-brand-500 h-4 w-4"
              />
              <span className="text-[13px] font-semibold text-surface-heading">Active Staff Member</span>
            </label>

            <div className="flex gap-2.5">
              <Link
                to="/team-profiles/all-members"
                className="rounded-lg border border-surface-border px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
              >
                {id ? <Save size={15} /> : <Plus size={15} />}
                {id ? 'Save Changes' : 'Create Profile'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
