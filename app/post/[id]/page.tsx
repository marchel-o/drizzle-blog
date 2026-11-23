'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

function PostDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/posts/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setPost(data))
      .catch((err) => console.error('Gagal memuat post:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus post ini?')) return;

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/');
    }
  };

  if (loading) return <p className="container mt-4">Loading...</p>;
  if (!post) return <p className="container mt-4">Post tidak ditemukan.</p>;

  return (
    <main className="container mt-4">
      <Link href="/" className="btn btn-secondary mb-3">
        &larr; Back to Posts
      </Link>

      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{post.title}</h1>
          <p className="text-muted">
            {new Date(post.createdAt).toLocaleDateString('id-ID')}
          </p>
          <hr />
          <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
            {post.content}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <Link href={`/post/${post.id}/edit`} className="btn btn-warning me-2">
          Edit Post
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Post
        </button>
      </div>
    </main>
  );
}

export default function PostDetailPage() {
  return (
    <Suspense fallback={<p className="container mt-4">Loading...</p>}>
      <PostDetailContent />
    </Suspense>
  );
}