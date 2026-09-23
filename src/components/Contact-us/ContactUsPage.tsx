import { useState, useMemo, useEffect } from 'react'

import type { Contact, ContactFormData } from './types'
import { initialContacts, createContactFromForm } from './data'

import ContactHeader from './components/ContactHeader'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import AddContactModal from './components/AddContactModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'

export default function ContactUsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedId, setSelectedId] = useState<number | null>(
    initialContacts[0]?.id ?? null
  )
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [mailFilter, setMailFilter] = useState<'all' | 'unread' | 'archived'>('all')

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)

  // Auto-mark as read when selected
  useEffect(() => {
    if (selectedId !== null) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === selectedId && !c.isRead ? { ...c, isRead: true } : c
        )
      )
    }
  }, [selectedId])

  /* ─── Derived ─── */
  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSubject =
        subjectFilter === 'All' || c.subject === subjectFilter

      let matchMail = false
      if (mailFilter === 'all') {
        matchMail = !c.isArchived
      } else if (mailFilter === 'unread') {
        // Keep in list if unread, or if it is the currently selected item so it doesn't vanish while reading
        matchMail = !c.isArchived && (!c.isRead || c.id === selectedId)
      } else if (mailFilter === 'archived') {
        matchMail = c.isArchived
      }
      return matchSubject && matchMail
    })
  }, [contacts, subjectFilter, mailFilter, selectedId])

  const selectedContact = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId]
  )

  const unreadCount = useMemo(
    () => contacts.filter((c) => !c.isArchived && !c.isRead).length,
    [contacts]
  )

  const archivedCount = useMemo(
    () => contacts.filter((c) => c.isArchived).length,
    [contacts]
  )

  /* ─── Handlers ─── */
  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id)
  }

  const handleArchive = (id: number) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isArchived: !c.isArchived } : c
      )
    )
  }

  const handleDeletePrompt = (contact: Contact) => {
    setDeletingContact(contact)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingContact) {
      setContacts((prev) => prev.filter((c) => c.id !== deletingContact.id))
      if (selectedId === deletingContact.id) {
        setSelectedId(null)
      }
      setIsDeleteOpen(false)
      setDeletingContact(null)
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setIsFormOpen(true)
  }

  const handleSave = (formData: ContactFormData) => {
    if (editingContact) {
      // Update
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id
            ? { ...c, ...formData }
            : c
        )
      )
    } else {
      // Create
      const nextId =
        contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1
      const newContact = createContactFromForm(formData, nextId)
      setContacts((prev) => [newContact, ...prev])
      setSelectedId(nextId)
    }
    setIsFormOpen(false)
    setEditingContact(null)
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] h-auto w-full max-w-[1600px] flex-col pb-10">
      {/* ─── Header Bar ─── */}
      <ContactHeader
        mailFilter={mailFilter}
        setMailFilter={setMailFilter}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        unreadCount={unreadCount}
        archivedCount={archivedCount}
        onAddNewContact={() => {
          setEditingContact(null)
          setIsFormOpen(true)
        }}
      />

      {/* ─── Split Panel ─── */}
      <div className="flex flex-col lg:flex-row xl:flex-row min-h-[500px] lg:h-[765px] xl:h-[765px] h-auto rounded-xl border border-surface-border shadow-card bg-white overflow-hidden">
        {/* Left: Contact List (~35%) */}
        <div className={`w-full lg:w-[380px] xl:w-[380px] lg:shrink-0 xl:shrink-0 lg:border-r xl:border-r border-surface-border ${selectedId !== null ? 'hidden lg:block xl:block' : 'block'}`}>
          <ContactList
            contacts={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            resultCount={filtered.length}
          />
        </div>

        {/* Right: Detail Panel */}
        <div className={`flex-1 min-w-0 h-full ${selectedId === null ? 'hidden lg:block xl:block' : 'block'} lg:flex lg:flex-col xl:flex xl:flex-col`}>
          <ContactDetail
            contact={selectedContact}
            onArchive={handleArchive}
            onDelete={handleDeletePrompt}
            onEdit={handleEdit}
            onBackToList={() => setSelectedId(null)}
          />
        </div>
      </div>

      {/* ─── Modals ─── */}
      <AddContactModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingContact(null)
        }}
        onSave={handleSave}
        initial={editingContact}
      />

      <DeleteConfirmModal
        open={isDeleteOpen}
        name={deletingContact?.name || ''}
        onClose={() => {
          setIsDeleteOpen(false)
          setDeletingContact(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}