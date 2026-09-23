// A deliberately lightweight rich text editor: no external editor library,
// just a contentEditable div plus document.execCommand for basic formatting.
// Good enough for blog body copy without pulling in a heavy dependency.

import { useRef } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Quote,
  Undo2,
  Redo2,
  Eraser,
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

const TOOLBAR_BUTTONS: Array<{ icon: typeof Bold; command: string; label: string; arg?: string }> = [
  { icon: Undo2, command: 'undo', label: 'Undo' },
  { icon: Redo2, command: 'redo', label: 'Redo' },
  { icon: Bold, command: 'bold', label: 'Bold' },
  { icon: Italic, command: 'italic', label: 'Italic' },
  { icon: Underline, command: 'underline', label: 'Underline' },
  { icon: Strikethrough, command: 'strikeThrough', label: 'Strikethrough' },
  { icon: Quote, command: 'formatBlock', label: 'Quote', arg: 'blockquote' },
  { icon: List, command: 'insertUnorderedList', label: 'Bullet list' },
  { icon: ListOrdered, command: 'insertOrderedList', label: 'Numbered list' },
  { icon: AlignLeft, command: 'justifyLeft', label: 'Align left' },
  { icon: AlignCenter, command: 'justifyCenter', label: 'Align center' },
  { icon: AlignRight, command: 'justifyRight', label: 'Align right' },
  { icon: Eraser, command: 'removeFormat', label: 'Clear formatting' },
]

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  function runCommand(command: string, arg?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, arg)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  function insertLink() {
    const url = window.prompt('Enter a URL')
    if (url) runCommand('createLink', url)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-surface-border bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-surface-border bg-slate-50/70 p-1.5">
        {TOOLBAR_BUTTONS.map(({ icon: Icon, command, label, arg }) => (
          <button
            key={label}
            type="button"
            title={label}
            onClick={() => runCommand(command, arg)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-brand-600"
          >
            <Icon size={15} />
          </button>
        ))}
        <button
          type="button"
          title="Insert link"
          onClick={insertLink}
          className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-brand-600"
        >
          <Link2 size={15} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[220px] w-full px-3.5 py-3 text-[13px] leading-relaxed text-slate-700 outline-none [&:empty]:before:text-slate-400 [&:empty]:before:content-[attr(data-placeholder)]"
      />
    </div>
  )
}
