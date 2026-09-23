import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getPosts, deletePost } from '../../lib/blogStore'

function formatDate(iso: string) {
  return iso
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState(() => getPosts())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [perPage, setPerPage] = useState(25)

  function confirmDelete() {
    if (deleteId) {
      setPosts(deletePost(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-4 sm:space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-bold text-brand-600 sm:text-xl">Blog Posts</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Manage all your blog posts and articles
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/blog-posts/new-post"
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            <Plus size={16} />
            New Post
          </Link>
          <button className="rounded-lg border border-surface-border bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50">
            Manage Categories
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-surface-border bg-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border p-5">
          <div>
            <h3 className="text-[14.5px] font-bold text-surface-heading">All Posts</h3>
            <p className="mt-0.5 text-[12.5px] text-surface-muted">
              A list of all blog posts in your system
            </p>
          </div>
          <label className="flex items-center gap-2 text-[12.5px] text-surface-muted">
            Entries per page
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-lg border border-surface-border bg-white px-2 py-1.5 text-[12.5px] text-slate-700 outline-none focus:border-brand-400"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        {posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[13.5px] font-medium text-surface-heading">No posts yet</p>
            <p className="mt-1 text-[12.5px] text-surface-muted">
              Create your first blog post to see it appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-surface-border text-[12px] uppercase tracking-wide text-surface-muted">
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Link</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, perPage).map((post) => (
                  <tr key={post.id} className="border-b border-surface-border last:border-0">
                    <td className="max-w-[280px] truncate px-5 py-3.5 font-semibold text-surface-heading">
                      {post.title}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">{post.link || 'N/A'}</td>
                    <td className="px-5 py-3.5 text-slate-600">{post.category || '—'}</td>
                    <td className="px-5 py-3.5 text-slate-600">{formatDate(post.date)}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-white ${
                          post.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/blog-posts/edit/${post.id}`}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                          aria-label="Edit post"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                          aria-label="Delete post"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl2 border border-surface-border bg-white p-5 shadow-lg"
          >
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete this post?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The post will be permanently removed.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
