import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PostForm from './PostForm'
import { getPost, updatePost, type PostInput } from '../../lib/blogStore'

export default function EditPostPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const post = id ? getPost(id) : undefined

  function handleSubmit(input: PostInput) {
    if (id) updatePost(id, input)
    navigate('/blog-posts/all-posts')
  }

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
        <p className="text-[13.5px] font-medium text-surface-heading">Post not found</p>
        <p className="mt-1 text-[12.5px] text-surface-muted">
          It may have been deleted. Go back to the list to see current posts.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/blog-posts/all-posts')}
          className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-brand-600"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-[16px] font-bold text-brand-600 sm:text-lg">Edit Blog Post</h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">Update this blog post</p>
        </div>
      </div>

      <PostForm
        initial={post}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/blog-posts/all-posts')}
      />
    </div>
  )
}
